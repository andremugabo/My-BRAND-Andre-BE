import mongoose, { Schema, Document } from "mongoose";
import joi from 'joi';

export interface IBlog extends Document {
    blogCategoryId: string;
    blogTitle: string;
    blogDescription: string;
    blogContent: string;
    blogImg: string;
    blogDate: Date;
}

const blogSchema: Schema = new Schema({
   
    blogCategoryId: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: [true, 'Blog title is required'],
    },
    blogDescription: {
        type: String,
        required: [true, 'Blog description is required'],
    },
    blogContent: {
        type: String,
        required: [true, 'Blog content is required'],
    },
    blogImg: {
        type: String,
        required: [true, 'Blog image is required'],
    },
    blogDate: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;

export const joinBlogValidation = (blogEntry: IBlog) => {
    const schema = joi.object({
        blogTitle: joi.string().required(),
        blogCategoryId: joi.string().required(),
        blogDescription: joi.string().min(10).max(500).required(),
        blogContent: joi.string().min(10).max(10000).required(),
        blogImg: joi.string().required(),
        blogDate: joi.date()
    });
    return schema.validate(blogEntry);
}
