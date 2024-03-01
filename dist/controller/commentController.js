"use strict";
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
exports.patchCommentByUserById = exports.fetchCommentByUser = exports.fetchAllComments = exports.createComment = void 0;
const commentModel_1 = __importDefault(require("../models/commentModel"));
//create comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield commentModel_1.default.create(req.body);
        res.status(200).json(comments);
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
        const comments = yield commentModel_1.default.find({});
        res.status(200).json(comments);
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
        const { u_id } = req.params;
        const comment = yield commentModel_1.default.find({ u_id: u_id });
        res.status(200).json(comment);
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
        const { u_id } = req.params;
        const { id } = req.params;
        const comment = yield commentModel_1.default.updateOne({ u_id: u_id, _id: id }, req.body);
        if (!comment) {
            return res.status(404).json({ message: `Cannot find any Comment with ID${id} and user ID ${u_id}` });
        }
        res.status(200).json(comment);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.patchCommentByUserById = patchCommentByUserById;
