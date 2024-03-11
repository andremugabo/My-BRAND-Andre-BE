import mongoose,{Schema, Document} from "mongoose";

export interface ILike extends Document {
    userId:string;
    commentId:string;
}

const like:Schema  = new Schema({
    userId:{
        type:String,
        required:[true,'Please user id is required']
    },
    commentId:{
        type:String,
        required:[true,'Please Comment id is required']
    }
});

const Like = mongoose.model<ILike>('Like',like);
export default Like;