import mongoose,{Schema, Document} from "mongoose";

export interface IBlog extends Document{
    u_id :string;
    bc_id:string;
    b_title: string;
    b_description:string;
    b_content:string;
    b_img: string;
    b_date: string;
}

const blogSchema : Schema = new Schema({
    u_id:{
        type:String,
        required:[true],
    },
    bc_id:{
        type:String,
        required:[true]
    },
    b_title:{
        type:String,
        required:[true,'Blog title is required'],
    },
    b_description:{
        type:String,
        required:[true,'Blog description is required'],
    },
    b_content:{
        type:String,
        required:[true,'Blog content is required'],
    },
    b_img:{
        type:String,
        required:[true,'Blog image is required'],
    },
    b_date:{
        type:String,
    }
});

const Blog = mongoose.model<IBlog>('Blog',blogSchema);
export default Blog;