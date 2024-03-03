import mongoose,{Schema,Document} from "mongoose";
export interface IUsers extends Document{
    userFullName: string;
    userEmail:string;
    userPassword:string;
    userPic:string;
    userDesc:string;
}

const userSchema: Schema = new Schema({
    userFullName :{
        type:String,
        required:[true,'Please enter your fullName']
    },
    userEmail:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true
    },
    userPassword:{
        type:String,
        required:[true,"Please enter your password"]
    },
    userPic:{
        type:String,
    },
    userDesc:{
        type:String,
    },
    isAdmin: {
        type: Boolean,
        default:false
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
