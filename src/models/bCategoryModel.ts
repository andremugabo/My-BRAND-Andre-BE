import mongoose,{Schema, Document} from "mongoose";

export interface IBCategory extends Document {
    bc_name:string;
}

const bCategory:Schema  = new Schema({
    bc_name:{
        type:String,
        required:[true,'Please Blog category name is required']
    }
});

const BCategory = mongoose.model<IBCategory>('BCategory',bCategory);
export default BCategory;