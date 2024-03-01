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
exports.deleteLikeByUserIdAndCommentId = exports.fetchLikeByUserIdByComment = exports.fetchAllLike = exports.createLike = void 0;
const likeModel_1 = __importDefault(require("../models/likeModel"));
//create like
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield likeModel_1.default.create(req.body);
        res.status(200).json(likes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createLike = createLike;
//fetch all like
const fetchAllLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield likeModel_1.default.find({});
        res.status(200).json(likes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllLike = fetchAllLike;
//fetch like by user u_id and Comment ID
const fetchLikeByUserIdByComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { u_id } = req.params;
        const { c_id } = req.params;
        const like = yield likeModel_1.default.find({ u_id: u_id, c_id: c_id });
        if (!like) {
            return res.status(404).json({ message: `Cannot find a comment with a user ID ${u_id} and Comment ID ${c_id}` });
        }
        res.status(200).json(like);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchLikeByUserIdByComment = fetchLikeByUserIdByComment;
//delete like by user id and comment id
const deleteLikeByUserIdAndCommentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { u_id } = req.params;
        const { c_id } = req.params;
        const like = yield likeModel_1.default.deleteOne({ u_id: u_id, c_id: c_id }, req.body);
        if (!like) {
            return res.status(404).json({ message: 'Like not found for the specified userID and commentID' });
        }
        res.status(200).json(like);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteLikeByUserIdAndCommentId = deleteLikeByUserIdAndCommentId;
