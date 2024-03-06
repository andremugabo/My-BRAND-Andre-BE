import mongoose, {Schema, Document} from "mongoose";
import joi from 'joi';

export interface IComment extends Document{
    userId:string;
    blogId:string;
    commentMsg:string;
    commentLike:[
         byUser:{
            userId:string,
            like:number
        }
    ]
       
    
    commentDate:string;
}

const commentSchema: Schema = new Schema({
    userId:{
        type:String,
        required:[true],
    },
    blogId:{
        type:String,
        required:true,
    },
    commentMsg:{
        type:String,
        required:[true,'Comment message is required'],
    },
    commentLike: [{
        byUser: {
            userId: {
                type: String
            },
            like: {
                type: Number,
                default: 0,
            }
        }
    }],
    commentDate:{
        type:Date,
        default:Date  
    }
});

const Comment = mongoose.model<IComment>('Comment',commentSchema);
export default Comment;
export const joiCommentValidation = (commentEntry: IComment)=>{
    const schema = joi.object({
        userId : joi.string().required(),
        blogId : joi.string().required(),
        commentMsg: joi.string().min(3).max(5000).required(),
        commentLike: joi.array().items(joi.object({
            byUser: joi.object({
                userId: joi.string(),
                like: joi.number().default(0),
            })
        })).default([]),
        commentDate: joi.date()
    });
     return schema.validate(commentEntry);
}