import mongoose,{Schema, Document} from "mongoose";

export interface IBCategory extends Document {
    blogCategoryName:string;
}

const bCategory:Schema  = new Schema({
    blogCategoryName:{
        type:String,
        required:[true,'Please Blog category name is required']
    }
});

const BCategory = mongoose.model<IBCategory>('BCategory',bCategory);
export default BCategory;