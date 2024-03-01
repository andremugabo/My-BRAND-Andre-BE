import mongoose, {Schema, Document} from "mongoose";

export interface IComment extends Document{
    u_id:string;
    b_id:string;
    c_msg:string;
    c_like:number;
    c_date:string;
}

const commentSchema: Schema = new Schema({
    u_id:{
        type:String,
        required:[true],
    },
    b_id:{
        type:String,
        required:true,
    },
    c_msg:{
        type:String,
        required:[true,'Comment message is required'],
    },
    c_like:{ 
        type:Number,
        default:0,
    },
    c_date:{
        type:String,
    }
});

const Comment = mongoose.model<IComment>('Comment',commentSchema);
export default Comment;