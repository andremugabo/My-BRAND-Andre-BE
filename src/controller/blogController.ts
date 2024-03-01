import express from 'express';
import Blog,{IBlog} from '../models/blogModel';


//create blog
export const createBlog = async(req: express.Request, res: express.Response)=>{
    try {
        const blogs = await Blog.create(req.body);
        res.status(200).json(blogs);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch all blog
export const fetchBlog = async(req: express.Request, res: express.Response)=>{
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch blog by id
export const fetchBlogById = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch blog by user id and blog id
export const fetchBlogByUserIdAndBlogId = async(req: express.Request, res: express.Response)=>{
    try {
        const {u_id} = req.params;
        const {b_id} = req.params;
        const blog = await Blog.findOne({u_id: u_id, _id: b_id},req.body);
        if(!blog){
            return res.status(404).json({message:'Blog not found for the specified userID and blogID'});
        }
        res.status(200).json(blog);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//patch blog by id
export const patchBlogById = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.updateOne({_id:id},req.body);
        if(!blog){
            return res.status(404).json({message:`Cannot find any user with ID${id}`});
        }
        res.status(200).json(blog);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//Delete blog by id
export const deleteBlog = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.deleteOne({ _id: id });
        if(blog.deletedCount === 0){
            return res.status(404).json({message:`cannot find any category with ID ${id}`});
        }
        res.status(200).json(blog);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }

}
