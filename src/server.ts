import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createUser, fetchUsers, fetchUserById, patchUserById, deleteUserById,login } from './controller/userController';
import { createCategory,fetchAllCategory,deleteCategory } from './controller/categoryController';
import { createBlog, fetchBlog, fetchBlogById,fetchBlogByUserIdAndBlogId ,patchBlogById, deleteBlog } from './controller/blogController';
import { createComment,fetchCommentByUser,fetchAllComments,patchCommentByUserById } from './controller/commentController';
import { createContactMsg, fetchAllContactMsg, patchContactMsgById } from './controller/contactMsgController';
import { createLike, fetchAllLike, fetchLikeByUserIdByComment, deleteLikeByUserIdAndCommentId } from './controller/likeController';

const app = express();

app.use(bodyParser.json());

const port: number = 5000;
const connection_url: string = "mongodb+srv://mugaboandre:NirereNadine1983@cluster0.1518h6w.mongodb.net/MyBrand-Andre?retryWrites=true&w=majority&appName=Cluster0";

/* USER APIs */


// CREATE A USER
app.post('/users', createUser);
//LOGIN 
app.post('/user',login);
// FETCH ALL USER
app.get('/users', fetchUsers);
// FETCH USERS BY ID
app.get('/user/:id', fetchUserById);
// UPDATE USER BY ID
app.patch('/user/:id', patchUserById);
// DELETE USER BY ID
app.delete('/user/:id', deleteUserById);

// CATEGORY APIs

//CREATE A CATEGORY
app.post('/category',createCategory);
//FETCH ALL CATEGORY
app.get('/categories',fetchAllCategory);
//DELETE CATEGORY BY ID
app.delete('/category/:id', deleteCategory);


// BLOG APIs

// CREATE A BLOG
app.post('/blogs', createBlog);
// FETCH ALL BLOG
app.get('/blogs', fetchBlog);
// FETCH BLOG BY ID
app.get('/blog/:id', fetchBlogById);
//FETCH BLOG BY USER ID AND BLOG ID
app.get('/blog/:u_id/:b_id', fetchBlogByUserIdAndBlogId);
// UPDATE BLOG BY ID
app.patch('/blog/:id', patchBlogById);
// DELETE BLOG BY ID
app.delete('/blog/:id', deleteBlog);

// COMMENT APIs

//CREATE A COMMENT
app.post('/comments',createComment);
//FETCH ALL COMMENT
app.get('/comments',fetchAllComments);
//FETCH COMMENT BY USER
app.get('/comment/:u_id',fetchCommentByUser);
//PATCH COMMENT BY USER ID AND COMMENT ID
app.patch('/comment/:u_id/:id',patchCommentByUserById);

// MESSAGE APIs

//CREATE A CONTACT MESSAGE
app.post('/contactMsgs',createContactMsg);
//FETCH ALL CONTACT MSG
app.get('/contactMsgs',fetchAllContactMsg);
//PATCH CONTACT MSG
app.patch('/readMsg/:id',patchContactMsgById);

// LIKE APIs

//CREATE A LIKE
app.post('/likes',createLike);
//FETCH ALL LIKE
app.get('/likes',fetchAllLike);
//FETCH LIKE BY USER U_ID AND COMMENT ID
app.get('/like/:u_id/:c_id',fetchLikeByUserIdByComment);
//DELETE LIKE BY USER ID AND COMMENT ID
app.delete('/like/:u_id/:c_id',deleteLikeByUserIdAndCommentId);




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
