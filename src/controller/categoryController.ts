import express from 'express';
import BCategory,{IBCategory} from '../models/bCategoryModel';

export const createCategory = async(req: express.Request, res: express.Response)=>{
    try {
        const category = await BCategory.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

export const fetchAllCategory = async(req: express.Request, res: express.Response)=>{
    try {
        const categories = await BCategory.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

export const deleteCategory = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const category = await BCategory.deleteOne({ _id: id });
        if(category.deletedCount === 0){
            return res.status(404).json({message:`cannot find any category with ID ${id}`});
        }
        res.status(200).json(category);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
    
}