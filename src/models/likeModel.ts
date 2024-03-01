import mongoose,{Schema, Document} from "mongoose";

export interface ILike extends Document {
    u_id:string;
    c_id:string;
}

const like:Schema  = new Schema({
    u_id:{
        type:String,
        required:[true,'Please user id is required']
    },
    c_id:{
        type:String,
        required:[true,'Please Comment id is required']
    }
});

const Like = mongoose.model<ILike>('Like',like);
export default Like;