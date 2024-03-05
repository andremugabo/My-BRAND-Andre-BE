import express from 'express';
import BCategory,{IBCategory, joiBlogCategoryValidation} from '../models/bCategoryModel';
import joi from 'joi';
import { getUser } from '../authentication/verifyToken';

export const createCategory = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
                const {category} = req.body;
                if(!category){
                    return res.status(400).json({ message: "Please provide the category" });
                }

                const {error} = joiBlogCategoryValidation(req.body);
                if(error){
                    console.error(error);
                    res.status(400).json({ error: error.details[0].message });
                }
                const checkCategoryExist = await BCategory.findOne({category});
                if(checkCategoryExist){
                    return res.status(400).json({ message: "The Category name is already registered" });
                }

                const getCategory = await BCategory.create(req.body);
                res.status(200).json(getCategory);
        } else{
            res.status(401).json({ message: "YOU NEED TO LOGIN AS ADMIN FIRST" });
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

export const fetchAllCategory = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
                const categories = await BCategory.find({});
                console.log(categories);
                if(categories.length === 0){
                    res.status(404).json({message:"THERE IS NO CATEGORY TO DISPLAY"})
                }
                res.status(200).json(categories);
        } else{
            res.status(401).json({ message: "YOU NEED TO LOGIN AS ADMIN FIRST" });
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

export const deleteCategory = async(req: express.Request, res: express.Response)=>{
    try {

        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
            const {id} = req.params;
            const category = await BCategory.deleteOne({ _id: id });
            if(category.deletedCount === 0){
                return res.status(404).json({message:`cannot find any category with ID ${id}`});
            }
            res.status(200).json({category,message:" CATEGORY DELETED SUCCESSFULLY "});
        } else{
            res.status(401).json({ message: "YOU NEED TO LOGIN AS ADMIN FIRST" });
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
    
}