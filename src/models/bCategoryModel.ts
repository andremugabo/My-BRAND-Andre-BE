import mongoose,{Schema, Document} from "mongoose";
import joi from 'joi';

export interface IBCategory extends Document {
    category:string;
}

const bCategory:Schema  = new Schema({
    category:{
        type:String,
        required:[true,'Please Blog category name is required']
    }
});

const BCategory = mongoose.model<IBCategory>('BCategory',bCategory);
export default BCategory;
export const joiBlogCategoryValidation = (bCategory:IBCategory)=>{
    const schema = joi.object({
        category:joi.string().required()
    });
    return schema.validate(bCategory);
}