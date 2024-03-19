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
exports.joinBlogValidation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const blogSchema = new mongoose_1.Schema({
    blogCategoryId: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: [true, 'Blog title is required'],
    },
    blogDescription: {
        type: String,
        required: [true, 'Blog description is required'],
    },
    blogContent: {
        type: String,
        required: [true, 'Blog content is required'],
    },
    blogImg: {
        type: String,
        required: [true, 'Blog image is required'],
    },
    blogDate: {
        type: Date,
        default: Date.now
    }
});
const Blog = mongoose_1.default.model('Blog', blogSchema);
exports.default = Blog;
const joinBlogValidation = (blogEntry) => {
    const schema = joi_1.default.object({
        blogTitle: joi_1.default.string().required(),
        blogCategoryId: joi_1.default.string().required(),
        blogDescription: joi_1.default.string().min(10).max(500).required(),
        blogContent: joi_1.default.string().min(10).max(10000).required(),
        blogImg: joi_1.default.string().required(),
        blogDate: joi_1.default.date()
    });
    return schema.validate(blogEntry);
};
exports.joinBlogValidation = joinBlogValidation;
