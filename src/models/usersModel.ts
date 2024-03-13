import mongoose,{Schema,Document, SchemaTypes} from "mongoose";
import joi from 'joi';
export interface IUsers extends Document{
    FullName: string;
    email:string;
    password:string;
    picture:string;
    description:string;
    isAdmin: boolean;
}

const userSchema: Schema = new Schema({
    FullName :{
        type:String,
        required:[true,'Please enter your fullName']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"]
    },
    picture:{
        type:String,
    },
    description:{
        type:String,
    },
    isAdmin: {
        type: Boolean,
        default:false,
        required:false
    }
});
const Users = mongoose.model<IUsers>('Users',userSchema);
export const joiUserValidation = (userEntry: IUsers)=>{
    const schema = joi.object({
        FullName :joi.string().min(3).max(30).required(),
        email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password:joi.string().required(),
        picture:joi.string().optional(),
        isAdmin:joi.boolean().optional()
    });
    return schema.validate(userEntry);
}
export default Users;

export const getUsersById = (id:String)=>Users.findById(id);

