import express from 'express';
import Comment,{IComment, joiCommentValidation} from '../models/commentModel';
import { getUser } from '../authentication/verifyToken';

//create comment
export const createComment = async(req:express.Request, res: express.Response)=>{
    try {
        const {userId, blogId, commentMsg,commentDate} = req.body
        if(!userId || !blogId || !commentMsg || !commentDate){
            return res.status(400).json({ message: "Please provide all required information to create a comment!" });
        }
        const {error} = joiCommentValidation(req.body);
        if(error){
            console.error(error);
            res.status(400).json({ error: error.details[0].message });
        }
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser){
            const comments = await Comment.create(req.body);
            res.status(200).json(comments);
        } else{
            res.status(401).json({ message: "YOU NEED TO LOGIN FIRST" });  

        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
};
//fetch all comment
export const fetchAllComments = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser){
            const comments = await Comment.find({});
            if(comments.length !== 0){
                res.status(200).json(comments);
            }else{
                res.status(404).json({message:"THERE IS NO COMMENT TO DISPLAY"})
            }
            
        } else{
            res.status(401).json({ message: "YOU NEED TO LOGIN FIRST" });  
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch comment by user id
export const fetchCommentByBlog = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser){
            const {blogId} = req.params;
            console.log(blogId);
            const comment = await Comment.find({blogId:blogId});
            if(comment.length !== 0){
                res.status(200).json(comment);
            }else{
                res.status(400).json({message:"THERE IS NO COMMENT DISPLAY FOR THE GIVEN BLOG"});
            }
            
        } else{
            res.status(401).json({ message: "YOU NEED TO LOGIN FIRST" });  
        }
       
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
//patch comment  by user id and comment id
export const patchCommentByUserById = async (req: express.Request, res: express.Response) => {
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if (checkUser) {
            
            const userId:string = checkUser._id;
            const { commentId} = req.params;
            const { action } = req.body;
            console.log(commentId);
            const checkIfCommentExist = await Comment.findById({commentId});
            console.log(checkIfCommentExist);

            const comment = await Comment.findOneAndUpdate({ userId, _id: commentId }, action, { new: true });
            if (comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            return res.status(200).json({ message: 'Comment updated successfully', comment });
        } else {
            res.status(401).json({ message: 'You are not authorized to update this comment' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};