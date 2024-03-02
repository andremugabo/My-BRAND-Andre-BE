"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const userController_1 = require("./controller/userController");
const categoryController_1 = require("./controller/categoryController");
const blogController_1 = require("./controller/blogController");
const commentController_1 = require("./controller/commentController");
const contactMsgController_1 = require("./controller/contactMsgController");
const likeController_1 = require("./controller/likeController");
const verifyToken_1 = require("./authentication/verifyToken");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const port = 5000;
const connection_url = "mongodb+srv://mugaboandre:NirereNadine1983@cluster0.1518h6w.mongodb.net/MyBrand-Andre?retryWrites=true&w=majority&appName=Cluster0";
/* USER APIs */
// CREATE A USER
app.post('/users', userController_1.createUser);
//LOGIN 
app.post('/user', userController_1.login);
// FETCH ALL USER
app.get('/users', verifyToken_1.verifyToken, userController_1.fetchUsers);
// FETCH USERS BY ID
app.get('/user/:id', verifyToken_1.verifyToken, userController_1.fetchUserById);
// UPDATE USER BY ID
app.patch('/user/:id', verifyToken_1.verifyToken, userController_1.patchUserById);
// DELETE USER BY ID
app.delete('/user/:id', verifyToken_1.verifyToken, userController_1.deleteUserById);
// CATEGORY APIs
//CREATE A CATEGORY
app.post('/category', verifyToken_1.verifyToken, categoryController_1.createCategory);
//FETCH ALL CATEGORY
app.get('/categories', verifyToken_1.verifyToken, categoryController_1.fetchAllCategory);
//DELETE CATEGORY BY ID
app.delete('/category/:id', verifyToken_1.verifyToken, categoryController_1.deleteCategory);
// BLOG APIs
// CREATE A BLOG
app.post('/blogs', verifyToken_1.verifyToken, blogController_1.createBlog);
// FETCH ALL BLOG
app.get('/blogs', verifyToken_1.verifyToken, blogController_1.fetchBlog);
// FETCH BLOG BY ID
app.get('/blog/:id', verifyToken_1.verifyToken, blogController_1.fetchBlogById);
//FETCH BLOG BY USER ID AND BLOG ID
app.get('/blog/:userId/:blogId', verifyToken_1.verifyToken, blogController_1.fetchBlogByUserIdAndBlogId);
// UPDATE BLOG BY ID
app.patch('/blog/:id', verifyToken_1.verifyToken, blogController_1.patchBlogById);
// DELETE BLOG BY ID
app.delete('/blog/:id', verifyToken_1.verifyToken, blogController_1.deleteBlog);
// COMMENT APIs
//CREATE A COMMENT
app.post('/comments', verifyToken_1.verifyToken, commentController_1.createComment);
//FETCH ALL COMMENT
app.get('/comments', verifyToken_1.verifyToken, commentController_1.fetchAllComments);
//FETCH COMMENT BY USER
app.get('/comment/:userId', verifyToken_1.verifyToken, commentController_1.fetchCommentByUser);
//PATCH COMMENT BY USER ID AND COMMENT ID
app.patch('/comment/:userId/:id', verifyToken_1.verifyToken, commentController_1.patchCommentByUserById);
// MESSAGE APIs
//CREATE A CONTACT MESSAGE
app.post('/contactMsgs', contactMsgController_1.createContactMsg);
//FETCH ALL CONTACT MSG
app.get('/contactMsgs', verifyToken_1.verifyToken, contactMsgController_1.fetchAllContactMsg);
//PATCH CONTACT MSG
app.patch('/readMsg/:id', verifyToken_1.verifyToken, contactMsgController_1.patchContactMsgById);
// LIKE APIs
//CREATE A LIKE
app.post('/likes', likeController_1.createLike);
//FETCH ALL LIKE
app.get('/likes', likeController_1.fetchAllLike);
//FETCH LIKE BY USER userID AND COMMENT ID
app.get('/like/:userId/:commentId', likeController_1.fetchLikeByUserIdByComment);
//DELETE LIKE BY USER ID AND COMMENT ID
app.delete('/like/:userId/:commentId', likeController_1.deleteLikeByUserIdAndCommentId);
mongoose_1.default.connect(connection_url)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
};
app.use(errorHandler);
