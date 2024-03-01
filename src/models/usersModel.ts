import mongoose,{Schema,Document} from "mongoose";
export interface IUsers extends Document{
    u_fullName: string;
    u_email:string;
    u_password:string;
    u_pic:string;
    u_desc:string;
}

const userSchema: Schema = new Schema({
    u_fullName :{
        type:String,
        required:[true,'Please enter your fullName']
    },
    u_email:{
        type:String,
        required:[true,'Please enter your email']
    },
    u_password:{
        type:String,
        required:[true,"Please enter your password"]
    },
    u_pic:{
        type:String,
    },
    u_desc:{
        type:String,
    }
});
const Users = mongoose.model<IUsers>('Users',userSchema);
export default Users;
export const getUsers = ()=>Users.find();
export const getUsersByEmail = (email:string)=>Users.findOne({email});
export const getUsersById = (id:String)=>Users.findById(id);
export const createUser = (values:Record <string, any>)=>new Users(values).save().then((user)=>user.toObject);
export const deleteUserById = (id:string)=>Users.findOne({_id:id});
export const updateUserById = (id:string,values:Record<string, any>)=>Users.findByIdAndUpdate(id, values);
