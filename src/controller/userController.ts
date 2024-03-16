import express from 'express';
import bcrypt from 'bcrypt'; // Import bcrypt library
import Users, { joiUserValidation,IUsers } from '../models/usersModel';
import jsonwebtoken from 'jsonwebtoken';
import { getUser } from '../authentication/verifyToken';
import dotenv from 'dotenv';
dotenv.config();




// Create user
export const createUser = async (req: express.Request, res: express.Response) => {
    try {


        const { FullName, email, password} = req.body;
        console.log(FullName);
        console.log(email);
        console.log(password);
        // Validate required fields
        if (!FullName || !email || !password) {
            return res.status(400).json({ message: "Please provide all required information to create a user!",status:400 });
        }

        const {error} = joiUserValidation(req.body);

        if(error){
            console.error(error);
            res.status(400).json({ error: error.details[0].message,status:400 });
        }


        // Check if email already exists
        const checkIfEmailExist = await Users.findOne({email});
        if (checkIfEmailExist) {
            return res.status(422).json({ message: "A user is registered with the same email, Try another email, or Login ", status:422 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        const user = await Users.create({
            FullName,
            email,
            password: hashedPassword,
        });

        res.status(200).json({status:200});
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login

export const login = async(req: express.Request, res:express.Response)=>{
        try {
            const {email, password} = req.body;

            if(!email || !password){
                res.status(400).json({message:"PLEASE PROVIDE YOUR EMAIL AND PASSWORD"});
            }

            const loginUser = await Users.findOne({email}).select('-password');
            if(!loginUser){
                return res.status(400).json({message:"YOUR ARE REGISTERED !!!"});
            }

            const checkPassword = await bcrypt.compare(password, loginUser.password);
            if(!checkPassword){
                return res.status(400).json({message:"INCORRECT PASSWORD !!!"});
            }

            
            const payload = {
                sub: loginUser.id,
            }
            const loggedUser = loginUser.isAdmin;
            const token = jsonwebtoken.sign(payload, process.env.JWT_DECODE_KEY!, {expiresIn:'1h'});
            res.status(200).json({token,loggedUser,loginUser});


        } catch (error) {
            console.log((error as Error).message);
            console.error("Error login user:",error);
            res.status(500).json({ message: "Internal server error" });
        }
}

//fetch all user
export const fetchUsers = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
            const users = await Users.find({}, { password: 0 });
            res.status(200).json(users);
        }else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO FETCH USERS" });
        }

    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//fetch user by id
export const fetchUserById = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
                const {id} = req.params;
                const user = await Users.findById(id,{password:0});
                res.status(200).json(user);
        }else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO FETCH A USER" });
        }

    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
//patch user by id
export const patchUserById = async(req: express.Request, res: express.Response)=>{

    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
                const {id} = req.params;
                const user = await Users.updateOne({_id:id},req.body);
                if(!user){
                    return res.status(404).json({message:`Cannot find any user with ID${id}`});
                }
                const getUser = await Users.findById(id,{password:0});
                res.status(200).json({getUser,message:"USERS UPDATED SUCCESSFULLY",status:200});
        } else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO EDIT A USER" });
        }

    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}

//delete user by id
export const deleteUserById = async(req: express.Request, res: express.Response)=>{
    try {
        const checkUser = await getUser((req as any).myAppToken);
        if(checkUser && checkUser.isAdmin){
            const {id} = req.params;
            const user = await Users.deleteOne({_id:id});
            if(!user){
                return res.status(404).json({message:`Can not find any user with ID ${id}`});
            }
            res.status(500).json({user,message:"USER DELETED SUCCESSFULLY "})
        } else{
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO DELETE A USER" });
        }

    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({message:(error as Error).message});
    }
}
