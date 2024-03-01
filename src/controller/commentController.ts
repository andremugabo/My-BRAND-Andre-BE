import express from 'express';
import Comment,{IComment} from '../models/commentModel';

//create comment
export const createComment = async(req:express.Request, res: express.Response)=>{
    try {
        const comments = await Comment.create(req.body);
        res.status(200).json(comments);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
};
//fetch all comment
export const fetchAllComments = async(req: express.Request, res: express.Response)=>{
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch comment by user id
export const fetchCommentByUser = async(req: express.Request, res: express.Response)=>{
    try {
        const {u_id} = req.params;
        const comment = await Comment.find({u_id:u_id});
        res.status(200).json(comment);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
//patch comment  by user id and comment id
export const patchCommentByUserById = async(req: express.Request, res: express.Response)=>{
    try {
        const {u_id} = req.params;    
        const {id} = req.params;
        const comment = await Comment.updateOne({u_id: u_id,_id:id},req.body);
        if(!comment){
            return res.status(404).json({message:`Cannot find any Comment with ID${id} and user ID ${u_id}`});
        }
        res.status(200).json(comment);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
