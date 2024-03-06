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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchCommentByUserById = exports.fetchCommentByUser = exports.fetchAllComments = exports.createComment = void 0;
const commentModel_1 = __importStar(require("../models/commentModel"));
const verifyToken_1 = require("../authentication/verifyToken");
//create comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, blogId, commentMsg, commentDate } = req.body;
        if (!userId || !blogId || !commentMsg || !commentDate) {
            return res.status(400).json({ message: "Please provide all required information to create a comment!" });
        }
        const { error } = (0, commentModel_1.joiCommentValidation)(req.body);
        if (error) {
            console.error(error);
            res.status(400).json({ error: error.details[0].message });
        }
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser) {
            const comments = yield commentModel_1.default.create(req.body);
            res.status(200).json(comments);
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
exports.createComment = createComment;
//fetch all comment
const fetchAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser) {
            const comments = yield commentModel_1.default.find({});
            if (comments.length !== 0) {
                res.status(200).json(comments);
            }
            else {
                res.status(404).json({ message: "THERE IS NO COMMENT TO DISPLAY" });
            }
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
exports.fetchAllComments = fetchAllComments;
//fetch comment by user id
const fetchCommentByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser) {
            const { userId } = req.params;
            const comment = yield commentModel_1.default.find({ userId: userId });
            if (comment.length !== 0) {
                res.status(200).json(comment);
            }
            else {
                res.status(400).json({ message: "THERE IS NO COMMENT DISPLAY FOR THE GIVEN USER" });
            }
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
exports.fetchCommentByUser = fetchCommentByUser;
//patch comment  by user id and comment id
const patchCommentByUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser) {
            const { userId } = req.params;
            const { commentId } = req.params;
            const { action } = req.body;
            const comment = yield commentModel_1.default.findById({ _id: commentId }, req.body);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found ' });
            }
            console.log(comment);
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO LIKE A COMMENT" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.patchCommentByUserById = patchCommentByUserById;
