import mongoose,{Schema, Document} from "mongoose";

export interface IBlog extends Document{
    userId :string;
    blogCategoryId:string;
    blogTitle: string;
    blogDescription:string;
    blogContent:string;
    blogImg: string;
    blogDate: string;
}

const blogSchema : Schema = new Schema({
    userId:{
        type:String,
        required:[true],
    },
    blogCategoryId:{
        type:String,
        required:[true]
    },
    blogTitle:{
        type:String,
        required:[true,'Blog title is required'],
    },
    blogDescription:{
        type:String,
        required:[true,'Blog description is required'],
    },
    blogContent:{
        type:String,
        required:[true,'Blog content is required'],
    },
    blogImg:{
        type:String,
        required:[true,'Blog image is required'],
    },
    blogDate:{
        type:String,
    }
});

const Blog = mongoose.model<IBlog>('Blog',blogSchema);
export default Blog;