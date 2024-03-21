import express from 'express';
import ContactMsg,{IContactMsg, joiContactMsg} from '../models/contactMsgModel';
import { getUser } from '../authentication/verifyToken';



//create contactMsg
export const createContactMsg = async(req: express.Request, res: express.Response)=>{
    try {
        const {name , email, msg, date} = req.body;
        if(!name || !email || !msg || !date){
            return res.status(400).json({message:"Please fill out all required information "});
        }

        const{error} = joiContactMsg(req.body);
        if(error){
            console.error(error);
            res.status(400).json({ error: error.details[0].message });
        }

        const contactMsgs = await ContactMsg.create(req.body);
        res.status(200).json({contactMsgs,status:200,message:"YOUR MESSAGE SENT SUCCESSFULLY !!"});
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }   
}

//fetch all contactMsg
export const fetchAllContactMsg = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
            const contactMsgs = await ContactMsg.find({});
            if(contactMsgs.length !== 0){
                res.status(200).json(contactMsgs);
            }else{
                res.status(404).json({message:"THERE IS NO MESSAGE TO DISPLAY"})
            }
            
        } else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO VIEW MESSAGE" });
        }
       
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//patch contactMsg
export const patchContactMsgById = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
            const {id} = req.params;
            const readMsg = await ContactMsg.findByIdAndUpdate({_id : id}, { read: '1' }, { new: true });
            if(!readMsg){
                return res.status(404).json({message:`Cannot find a message with  ID ${id}`})
            }
            res.status(200).json({readMsg,status:200});
        } else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO READ MESSAGE" });
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}



