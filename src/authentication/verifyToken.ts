import { json } from 'body-parser';
import express from 'express';
import  jwt, { VerifyErrors }  from 'jsonwebtoken';
import Users, { IUsers, getUsersById } from '../models/usersModel';
import { Document, Types } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()


//FORMAT OF TOKEN
// authorization: Bearer <access_token>
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');

        //Check if the authorization header format is correct
        if (bearer.length !== 2 || bearer[0] !== 'bearer') {
            return res.status(401).json({ message: 'Invalid authorization header format' });
        }

        // Get token from array
        const bearerToken = bearer[1];

        // Set the token
        (req as any).myAppToken = bearerToken;

        // Call the next middleware
        next();  
    } else {
        // Not authorized 
        res.status(401).json({ message: 'PLEASE PROVIDE THE CORRECT TOKEN ' });
    }
};


interface User {
    sub: string;
    iat: number;
    exp: number;
}

export const getUser = async (token: string): Promise<IUsers | null> => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_DECODE_KEY!) as { sub: string };
        const user = await getUsersById(decoded.sub);
        
        if (!user) {
            console.error("User not found");
            return null; // Return null if user is not found
        }
        return user;
    } catch (error) {
        console.error("Error while decoding token or fetching user:", error);
        return null; // Return null if any error occurs
    }
};
