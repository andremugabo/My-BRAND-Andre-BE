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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.patchBlogById = exports.fetchBlogById = exports.fetchBlog = exports.createBlog = void 0;
const blogModel_1 = __importStar(require("../models/blogModel"));
const verifyToken_1 = require("../authentication/verifyToken");
const usersModel_1 = __importDefault(require("../models/usersModel"));
//create blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (user && user.isAdmin) {
            const { userId, blogTitle, blogCategoryId, blogDescription, blogContent, blogImg, blogDate } = req.body;
            if (!userId || !blogTitle || !blogCategoryId || !blogDescription || !blogContent || !blogImg || !blogDate) {
                return res.status(400).json({ message: "Please provide all required information to create a Blog!", status: 400 });
            }
            const { error } = (0, blogModel_1.joinBlogValidation)(req.body);
            if (error) {
                console.error(error);
                res.status(400).json({ error: error.details[0].message });
                return;
            }
            // Create the blog
            blogModel_1.default.create(req.body)
                .then(blog => {
                res.status(200).json({ blog, message: "BLOG CREATED !!!!", status: 200 });
            });
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED. ONLY ADMIN CAN POST BLOGS" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createBlog = createBlog;
//fetch all blog
const fetchBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let image;
        const blogs = yield blogModel_1.default.find({});
        if (blogs.length === 0) {
            res.status(404).json({ message: "THERE IS NO BLOG TO DISPLAY" });
        }
        else {
            for (let key of blogs) {
                const blogCreator = yield usersModel_1.default.findOne({ userId: key.userId });
                console.log(blogCreator);
            }
            res.status(200).json({ blogs, status: 200 });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchBlog = fetchBlog;
//fetch blog by id
const fetchBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser) {
            const { id } = req.params;
            const blog = yield blogModel_1.default.findById(id);
            res.status(200).json(blog);
        }
        else {
            res.status(401).json({ message: "YOU NEED TO LOGIN FIRST" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchBlogById = fetchBlogById;
//patch blog by id
const patchBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (user && user.isAdmin) {
            const { id } = req.params;
            const blog = yield blogModel_1.default.updateOne({ _id: id }, req.body);
            if (!blog) {
                return res.status(404).json({ message: `Cannot find any user with ID${id}` });
            }
            res.status(200).json({ blog, message: "BLOG UPDATED SUCCESSFULLY" });
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO EDIT A BLOG" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.patchBlogById = patchBlogById;
//Delete blog by id
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const { id } = req.params;
            const blog = yield blogModel_1.default.deleteOne({ _id: id });
            if (blog.deletedCount === 0) {
                return res.status(404).json({ message: `cannot find any category with ID ${id}` });
            }
            res.status(200).json({ blog, message: "Blog deleted successfully " });
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO DELETE A BLOG" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteBlog = deleteBlog;
