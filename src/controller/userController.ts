import express from 'express';
import bcrypt from 'bcrypt'; // Import bcrypt library
import Users, { IUsers } from '../models/usersModel';
import jsonwebtoken from 'jsonwebtoken';

// Create user
export const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const { u_fullName, u_email, u_password } = req.body;

        // Validate required fields
        if (!u_fullName || !u_email || !u_password) {
            return res.status(400).json({ message: "Please provide all information!" });
        }

        // Check if email already exists
        const checkIfEmailExist = await Users.findOne({u_email});
        if (checkIfEmailExist) {
            console.log("here");
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(u_password, 10);

        // Create user with hashed password
        const user = await Users.create({
            u_fullName,
            u_email,
            u_password: hashedPassword 
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
            const {u_email, u_password} = req.body;

            if(!u_email || !u_password){
                res.status(400).json({message:"Please Provide your Email and Password"});
            }

            const loginUser = await Users.findOne({u_email});
            if(!loginUser){
                return res.status(400).json({message:"Your are not registered !!!"});
            }

            const checkPassword = await bcrypt.compare(u_password, loginUser.u_password);
            if(!checkPassword){
                return res.status(400).json({message:"Incorrect password !!"});
            }

            const token = jsonwebtoken.sign({id: loginUser._id},'654321',{expiresIn:'1h'});
            res.status(200).json({token})

            
        } catch (error) {
            console.log((error as Error).message);
            res.status(500).json({ message: "Internal server error" });
        }
}

//fetch all user
export const fetchUsers = async(req: express.Request, res: express.Response)=>{
    try {
        const users = await Users.find({});
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
