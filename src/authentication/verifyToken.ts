import express from 'express';
import JsonWebToken  from "jsonwebtoken";


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

