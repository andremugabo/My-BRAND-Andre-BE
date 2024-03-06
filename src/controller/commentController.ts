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
export const fetchCommentByUser = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser){
            const {userId} = req.params;
            const comment = await Comment.find({userId:userId});
            if(comment.length !== 0){
                res.status(200).json(comment);
            }else{
                res.status(400).json({message:"THERE IS NO COMMENT DISPLAY FOR THE GIVEN USER"});
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
export const patchCommentByUserById = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser){
            const {userId} = req.params;    
            const {commentId} = req.params;    
            const {action} = req.body;

            const comment = await Comment.findById({_id:commentId},req.body);
            if(!comment){
                return res.status(404).json({ message: 'Comment not found ' });
            }
            console.log(comment);
           
        } else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO LIKE A COMMENT" });  
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
