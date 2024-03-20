import mongoose, {Schema,Document} from "mongoose";
import joi from 'joi';

export interface IContactMsg extends Document{
    name:string;
    email:string;
    msg:string;
    read:'1'|'0';
    date:Date;
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
    },
    date: {
        type: Date,
        default: Date
    }
});

const ContactMsg = mongoose.model<IContactMsg>('ContactMsg',contactMsgSchema);
export default ContactMsg;
export const joiContactMsg = (contactMsgEntry:IContactMsg)=>{
    const schema = joi.object({
        name : joi.string().required(),
        email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        msg: joi.string().min(10).max(1000).required(),
        read: joi.string().valid('1', '0').default('0'),
        date: joi.date()
    })
    return schema.validate(contactMsgEntry);
}

