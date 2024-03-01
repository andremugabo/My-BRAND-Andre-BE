import express from 'express';
import ContactMsg,{IContactMsg} from '../models/contactMsgModel';


//create contactMsg
export const createContactMsg = async(req: express.Request, res: express.Response)=>{
    try {
        const contactMsgs = await ContactMsg.create(req.body);
        res.status(200).json(contactMsgs);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch all contactMsg
export const fetchAllContactMsg = async(req: express.Request, res: express.Response)=>{
    try {
        const contactMsgs = await ContactMsg.find({});
        res.status(200).json(contactMsgs);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//patch contactMsg
export const patchContactMsgById = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const readMsg = await ContactMsg.findByIdAndUpdate({_id : id}, { read: '1' }, { new: true });
        if(!readMsg){
            return res.status(404).json({message:`Cannot find a message with  ID ${id}`})
        }
        res.status(200).json(readMsg);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}



