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
exports.joiCommentValidation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: [true],
    },
    blogId: {
        type: String,
        required: true,
    },
    commentMsg: {
        type: String,
        required: [true, 'Comment message is required'],
    },
    commentLike: {
        type: Number,
        default: 0,
    },
    commentDate: {
        type: Date,
        default: Date.now
    }
});
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;
const joiCommentValidation = (commentEntry) => {
    const schema = joi_1.default.object({
        userId: joi_1.default.string().required(),
        blogId: joi_1.default.string().required(),
        commentMsg: joi_1.default.string().min(3).max(500).required(),
        commentLike: joi_1.default.number().default(0),
        commentDate: joi_1.default.date().timestamp()
    });
    return schema.validate(commentEntry);
};
exports.joiCommentValidation = joiCommentValidation;
