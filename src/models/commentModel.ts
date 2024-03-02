import mongoose, {Schema, Document} from "mongoose";

export interface IComment extends Document{
    userId:string;
    blogId:string;
    commentMsg:string;
    commentLike:number;
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
    commentLike:{ 
        type:Number,
        default:0,
    },
    commentDate:{
        type:String,
    }
});

const Comment = mongoose.model<IComment>('Comment',commentSchema);
export default Comment;