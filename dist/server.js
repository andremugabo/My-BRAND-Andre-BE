"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const verifyToken_1 = require("./authentication/verifyToken");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const connection_url = process.env.DB_URL;
// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});
app.use(body_parser_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('MY-BRAND-ANDRE-BE');
});
// User APIs
app.post('/users', userController_1.createUser);
app.post('/user', userController_1.login);
app.get('/users', verifyToken_1.verifyToken, userController_1.fetchUsers);
app.get('/user/:id', verifyToken_1.verifyToken, userController_1.fetchUserById);
app.patch('/user/:id', verifyToken_1.verifyToken, userController_1.patchUserById);
app.delete('/user/:id', verifyToken_1.verifyToken, userController_1.deleteUserById);
// Category APIs
app.post('/category', verifyToken_1.verifyToken, categoryController_1.createCategory);
app.get('/categories', verifyToken_1.verifyToken, categoryController_1.fetchAllCategory);
app.delete('/category/:id', verifyToken_1.verifyToken, categoryController_1.deleteCategory);
// Blog APIs
app.post('/createBlogs', verifyToken_1.verifyToken, blogController_1.createBlog);
app.get('/fetchBlogs', blogController_1.fetchBlog);
app.get('/fetchBlogById/:id', verifyToken_1.verifyToken, blogController_1.fetchBlogById);
app.patch('/patchBlogById/:id', verifyToken_1.verifyToken, blogController_1.patchBlogById);
app.delete('/deleteBlogById/:id', verifyToken_1.verifyToken, blogController_1.deleteBlog);
// Comment APIs
app.post('/comments', verifyToken_1.verifyToken, commentController_1.createComment);
app.get('/comments', verifyToken_1.verifyToken, commentController_1.fetchAllComments);
app.get('/comment/:userId', verifyToken_1.verifyToken, commentController_1.fetchCommentByUser);
app.patch('/commentLike/:id', verifyToken_1.verifyToken, commentController_1.patchCommentByUserById);
// Message APIs
app.post('/contactMsgs', contactMsgController_1.createContactMsg);
app.get('/contactMsgs', verifyToken_1.verifyToken, contactMsgController_1.fetchAllContactMsg);
app.patch('/readMsg/:id', verifyToken_1.verifyToken, contactMsgController_1.patchContactMsgById);
// Like APIs
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
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
exports.default = app;
