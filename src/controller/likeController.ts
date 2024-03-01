import express from 'express';
import Like,{ILike} from '../models/likeModel';


//create like
export const createLike = async(req: express.Request, res: express.Response)=>{
    try {
        const likes = await Like.create(req.body);
        res.status(200).json(likes);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch all like
export const fetchAllLike = async(req: express.Request, res: express.Response)=>{
    try {
        const likes = await Like.find({});
        res.status(200).json(likes);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch like by user u_id and Comment ID
export const fetchLikeByUserIdByComment = async(req: express.Request, res: express.Response)=>{
    try {
        const {u_id} = req.params;
        const {c_id} = req.params;
        const like = await Like.find({u_id:u_id,c_id:c_id});
        if(!like){
            return res.status(404).json({message:`Cannot find a comment with a user ID ${u_id} and Comment ID ${c_id}`})
        }
        res.status(200).json(like);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//delete like by user id and comment id
export const deleteLikeByUserIdAndCommentId = async(req: express.Request, res: express.Response)=>{
    try {
        const {u_id} = req.params;
        const {c_id} = req.params;
        const like = await Like.deleteOne({u_id: u_id, c_id: c_id},req.body);
        if(!like){
            return res.status(404).json({message:'Like not found for the specified userID and commentID'});
        }
        res.status(200).json(like);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
