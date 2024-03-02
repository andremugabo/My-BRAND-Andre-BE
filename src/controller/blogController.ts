import express from 'express';
import Blog,{IBlog} from '../models/blogModel';
import  jwt, { VerifyErrors }  from 'jsonwebtoken';


//create blog
export const createBlog = async (req: express.Request, res: express.Response) => {
    try {
        jwt.verify((req as any).myAppToken, '987654321', (err: jwt.VerifyErrors | null, auth: any) => {
            if (err) {
                res.sendStatus(403);
            } else {
                if (auth.user === "andre@gmail.com") {
                    // Create the blog
                    Blog.create(req.body)
                        .then(blog => {
                            res.status(200).json({ blog, auth, message: "Blog Created" });
                        })
                        .catch(error => {
                            console.log((error as Error).message);
                            res.status(500).json({ message: (error as Error).message });
                        });
                } else {
                    res.status(401).json({ message: "YOU ARE NOT AUTHORIZED" });
                }
            }
        });
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({ message: (error as Error).message });
    }
};

// export const createBlog = async(req: express.Request, res: express.Response)=>{
//     try {
//         jwt.verify((req as any).myAppToken, '987654321',(err: VerifyErrors | null, auth:any)=>{
//             if(err){
//                 res.sendStatus(403);
//             }else{
//                 if(auth.user === "andre@gmail.com"){
//                      const blogs = Blog.create(req.body);
//                     res.status(200).json(blogs,{auth,message:"Blog Created"});
//                 }else{
//                     res.status(401).json({message:"YOU ARE NOT AUTHORIZED"})
//                 }
               
//             }
//         } )
        
//     } catch (error) {
//         console.log((error as Error).message);
//         res.status(500).json({message:(error as Error).message});
//     }
// }

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
        const {userId} = req.params;
        const {blogId} = req.params;
        const blog = await Blog.findOne({userId: userId, _id: blogId},req.body);
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
