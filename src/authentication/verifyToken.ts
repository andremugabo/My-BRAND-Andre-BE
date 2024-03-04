import { json } from 'body-parser';
import express from 'express';
import  jwt, { VerifyErrors }  from 'jsonwebtoken';
import Users, { IUsers, getUsersById } from '../models/usersModel';
import { Document, Types } from 'mongoose';


//FORMAT OF TOKEN
// authorization: Bearer <access_token>
export const verifyToken = (req: express.Request,res: express.Response, next: express.NextFunction)=>{
    //Get auth header value
    const bearerHeader  = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');  
        //get token from array
        const bearerToken = bearer[1];
        //set the token 
        (req as any).myAppToken = bearerToken;

        next();  
    }else{
        //not authorized 
        res.status(401).json({
            message:"YOUR ARE NOT AUTHORIZED"
        }); 

    }  

 
}

interface User {
    sub: string;
    iat: number;
    exp: number;
}

export const getUser = async (token:string) : Promise<IUsers | null>  =>{
    const decoded = jwt.verify(token, '987654321');
    const user = await getUsersById(decoded.sub as string)
    console.log(user + "s")
    const usr = {
        _id: user!._id,
        userEmail: user!.email,
        userFullName: user!.FullName,
        userPassword: user!.password,
        isAdmin: user!.isAdmin,
    } as any
    return usr;
}