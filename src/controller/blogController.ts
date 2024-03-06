import express from 'express';
import Blog,{IBlog, joinBlogValidation} from '../models/blogModel';
import  jwt, { VerifyErrors }  from 'jsonwebtoken';
import { getUser } from '../authentication/verifyToken';


//create blog
export const createBlog = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUser((req as any).myAppToken);
        const {error} = joinBlogValidation(req.body);
        if(error){
            console.error(error);
            res.status(400).json({ error: error.details[0].message });
        }
        // console.log(user)
        if (user && user.isAdmin) { 
            // Create the blog
            Blog.create(req.body)
                .then(blog => {
                    res.status(200).json({ blog, user, message: "Blog Created" });
                })
                .catch(error => {
                    console.log((error as Error).message);
                    res.status(500).json({ message: (error as Error).message });
                });
        } else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED. ONLY ADMIN CAN POST BLOGS" });
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({ message: (error as Error).message });
    }
};


//fetch all blog
export const fetchBlog = async(req: express.Request, res: express.Response)=>{
    try {
        const blogs = await Blog.find({});
        if(blogs.length === 0){
            res.status(404).json({message:"THERE IS NO BLOG TO DISPLAY"})
        }else{
            res.status(200).json(blogs);
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});   
    }
}

//fetch blog by id
export const fetchBlogById = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser){
            const {id} = req.params;
            const blog = await Blog.findById(id);
            res.status(200).json(blog);
        } else{
            res.status(401).json({ message: "YOU NEED TO LOGIN FIRST" });
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}



//patch blog by id
export const patchBlogById = async(req: express.Request, res: express.Response)=>{
    try {
        const user = await getUser((req as any).myAppToken);
        if(user && user.isAdmin){

            const {id} = req.params;
            const blog = await Blog.updateOne({_id:id},req.body);
            if(!blog){
                return res.status(404).json({message:`Cannot find any user with ID${id}`});
            }
            res.status(200).json({blog,message:"BLOG UPDATED SUCCESSFULLY"});

        }else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO EDIT A BLOG" });
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//Delete blog by id
export const deleteBlog = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
            const {id} = req.params;
            const blog = await Blog.deleteOne({ _id: id });
            if(blog.deletedCount === 0){
                return res.status(404).json({message:`cannot find any category with ID ${id}`});
            }
            res.status(200).json({blog,message:"Blog deleted successfully "});
        } else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO DELETE A BLOG" });
        }
       
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }

}
