import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createUser, fetchUsers, fetchUserById, patchUserById, deleteUserById, login } from './controller/userController';
import { createCategory, fetchAllCategory, deleteCategory } from './controller/categoryController';
import { createBlog, fetchBlog, fetchBlogById, patchBlogById, deleteBlog } from './controller/blogController';
import { createComment, fetchCommentByUser, fetchAllComments, patchCommentByUserById } from './controller/commentController';
import { createContactMsg, fetchAllContactMsg, patchContactMsgById } from './controller/contactMsgController';
import { verifyToken } from './authentication/verifyToken';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const port: number | string = process.env.PORT || 5000;
const connection_url: string = process.env.DB_URL!;

// CORS middleware


// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins: string[] = ['https://my-brand-andre-be.onrender.com', 'http://127.0.0.1:5501', 'https://andremugabo.github.io/MyBRAND-Andre']; // Add other allowed origins as needed
  const origin: string | undefined = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next(); 
});



app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('MY-BRAND-ANDRE-BE');
});

// User APIs
app.post('/users', createUser);
app.post('/user', login);
app.get('/users', verifyToken, fetchUsers);
app.get('/user/:id', verifyToken, fetchUserById);
app.patch('/user/:id', verifyToken, patchUserById);
app.delete('/user/:id', verifyToken, deleteUserById);

// Category APIs
app.post('/category', verifyToken, createCategory);
app.get('/categories', verifyToken, fetchAllCategory);
app.delete('/category/:id', verifyToken, deleteCategory);

// Blog APIs
app.post('/createBlogs', verifyToken, createBlog);
app.get('/fetchBlogs', fetchBlog);
app.get('/fetchBlogById/:id', verifyToken, fetchBlogById);
app.patch('/patchBlogById/:id', verifyToken, patchBlogById);
app.delete('/deleteBlogById/:id', verifyToken, deleteBlog);

// Comment APIs
app.post('/comments', verifyToken, createComment);
app.get('/comments', verifyToken, fetchAllComments);
app.get('/comment/:userId', verifyToken, fetchCommentByUser);
app.patch('/commentLike/:id', verifyToken, patchCommentByUserById);

// Message APIs
app.post('/contactMsgs', createContactMsg);
app.get('/contactMsgs', verifyToken, fetchAllContactMsg);
app.patch('/readMsg/:id', verifyToken, patchContactMsgById);

// Like APIs

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(connection_url)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
};

app.use(errorHandler);

export default app;
