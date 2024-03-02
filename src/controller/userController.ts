import express from 'express';
import bcrypt from 'bcrypt'; // Import bcrypt library
import Users, { IUsers } from '../models/usersModel';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

 


// Create user
export const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const { userFullName, userEmail, userPassword } = req.body;

        // Validate required fields
        if (!userFullName || !userEmail || !userPassword) {
            return res.status(400).json({ message: "Please provide all information!" });
        }

        // Check if email already exists
        const checkIfEmailExist = await Users.findOne({userEmail});
        if (checkIfEmailExist) {
            console.log("here");
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Create user with hashed password
        const user = await Users.create({
            userFullName,
            userEmail,
            userPassword: hashedPassword 
        });

        res.status(200).json(user);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login 

export const login = async(req: express.Request, res:express.Response)=>{
        try {
            const {userEmail, userPassword} = req.body;

            if(!userEmail || !userPassword){
                res.status(400).json({message:"Please Provide your Email and Password"});
            }

            const loginUser = await Users.findOne({userEmail});
            if(!loginUser){
                return res.status(400).json({message:"Your are not registered !!!"});
            }

            const checkPassword = await bcrypt.compare(userPassword, loginUser.userPassword);
            if(!checkPassword){
                return res.status(400).json({message:"Incorrect password !!"});
            }

            // if (!process.env.KEY_TOKEN) {
            //     throw new Error('KEY_TOKEN environment variable is not defined.');
            // }
            const token = jsonwebtoken.sign({user: loginUser.userEmail},'987654321',{expiresIn:'1h'});
            res.status(200).json({token})

            
        } catch (error) {
            console.log((error as Error).message);
            res.status(500).json({ message: "Internal server error" });
        }
}

//fetch all user
export const fetchUsers = async(req: express.Request, res: express.Response)=>{
    try {
        const users = await Users.find({}, { userPassword: 0 });
        res.status(200).json(users);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch user by id
export const fetchUserById = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const user = await Users.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
//patch user by id
export const patchUserById = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const user = await Users.updateOne({_id:id},req.body);
        if(!user){
            return res.status(404).json({message:`Cannot find any user with ID${id}`});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//delete user by id
export const deleteUserById = async(req: express.Request, res: express.Response)=>{
    try {
        const {id} = req.params;
        const user = await Users.deleteOne({_id:id});
        if(!user){
            return res.status(404).json({message:`Can not find any user with ID ${id}`});
        }
        res.status(500).json(user)
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
