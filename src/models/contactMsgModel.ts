import mongoose, {Schema,Document} from "mongoose";

export interface IContactMsg extends Document{
    name:string;
    email:string;
    msg:string;
    read:'1'|'0';
}

const contactMsgSchema: Schema = new Schema({
    name:{
        type: String,
        required:[true,'Please name is required']
    },
    email:{
        type:String,
        required:[true,'Please email is required']
    },
    msg:{
        type:String,
        required:[true,'Please msg is required']
    },
    read:{
      type:String,
      enum:['1','0'],
      default: '0'
    }
});

const ContactMsg = mongoose.model<IContactMsg>('ContactMsg',contactMsgSchema);
export default ContactMsg;
