import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createUser, fetchUsers, fetchUserById, patchUserById, deleteUserById,login } from './controller/userController';
import { createCategory,fetchAllCategory,deleteCategory } from './controller/categoryController';
import { createBlog, fetchBlog, fetchBlogById ,patchBlogById, deleteBlog } from './controller/blogController';
import { createComment,fetchCommentByBlog,fetchAllComments,patchCommentByUserById } from './controller/commentController';
import { createContactMsg, fetchAllContactMsg, patchContactMsgById } from './controller/contactMsgController';
import { verifyToken } from './authentication/verifyToken';
import swaggerUi from 'swagger-ui-express'; 
import * as swaggerDocument from './swagger.json';
import dotenv from 'dotenv';
dotenv.config();



const app = express();

app.use(bodyParser.json());

const port: number | string = process.env.HOST as string | number || 4001;
const connection_url: string = process.env.DB_URL!;

app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins: string[] = ['https://my-brand-andre-be.onrender.com', 'http://127.0.0.1:5501', 'https://andremugabo.github.io']; // Add other allowed origins as needed
  const origin: string | undefined = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next(); 
});



app.get('/', (req, res) => {
    res.send('MY-BRAND-ANDRE-BE');   
  });
  

/* USER APIs */

// CREATE A USER

app.post('/users', createUser);
//LOGIN 
app.post('/user',login);
// FETCH ALL USER
app.get('/users', verifyToken ,fetchUsers);
// FETCH USERS BY ID
app.get('/user/:id', verifyToken, fetchUserById);
// UPDATE USER BY ID
app.patch('/user/:id', verifyToken, patchUserById);
// DELETE USER BY ID
app.delete('/user/:id', verifyToken, deleteUserById);

// CATEGORY APIs

//CREATE A CATEGORY
app.post('/category',  verifyToken, createCategory);
//FETCH ALL CATEGORY
app.get('/categories',  verifyToken, fetchAllCategory);
//DELETE CATEGORY BY ID
app.delete('/category/:id',  verifyToken, deleteCategory);


// BLOG APIs

// CREATE A BLOG
app.post('/createBlogs',  verifyToken,  createBlog);
// FETCH ALL BLOG
app.get('/fetchBlogs',fetchBlog);
// FETCH BLOG BY ID
app.get('/fetchBlogById/:id',   verifyToken, fetchBlogById);

// UPDATE BLOG BY ID
app.patch('/patchBlogById/:id',   verifyToken, patchBlogById);
// DELETE BLOG BY ID
app.delete('/deleteBlogById/:id',  verifyToken,  deleteBlog);

// COMMENT APIs

//CREATE A COMMENT
app.post('/comments',   verifyToken, createComment);
//FETCH ALL COMMENT
app.get('/comments',  verifyToken, fetchAllComments);
//FETCH COMMENT BY USER
app.get('/comment/:blogId',  verifyToken, fetchCommentByBlog); 
//PATCH COMMENT BY USER ID AND COMMENT ID
app.patch('/commentLike/:id',  verifyToken, patchCommentByUserById);

// MESSAGE APIs

//CREATE A CONTACT MESSAGE
app.post('/contactMsgs',createContactMsg);
//FETCH ALL CONTACT MSG
app.get('/contactMsgs',  verifyToken, fetchAllContactMsg);
//PATCH CONTACT MSG
app.patch('/readMsg/:id',  verifyToken, patchContactMsgById);

// LIKE APIs



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
