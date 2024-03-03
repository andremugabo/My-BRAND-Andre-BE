"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.patchUserById = exports.fetchUserById = exports.fetchUsers = exports.login = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt")); // Import bcrypt library
const usersModel_1 = __importDefault(require("../models/usersModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import dotenv from 'dotenv';
// dotenv.config();
// Create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userFullName, userEmail, userPassword } = req.body;
        // Validate required fields
        if (!userFullName || !userEmail || !userPassword) {
            return res.status(400).json({ message: "Please provide all information!" });
        }
        // Check if email already exists
        const checkIfEmailExist = yield usersModel_1.default.findOne({ userEmail });
        if (checkIfEmailExist) {
            console.log("here");
            return res.status(400).json({ message: "Email already exists!" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(userPassword, 10);
        // Create user with hashed password
        const user = yield usersModel_1.default.create({
            userFullName,
            userEmail,
            userPassword: hashedPassword
        });
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUser = createUser;
// Login 
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, userPassword } = req.body;
        if (!userEmail || !userPassword) {
            res.status(400).json({ message: "Please Provide your Email and Password" });
        }
        const loginUser = yield usersModel_1.default.findOne({ userEmail });
        if (!loginUser) {
            return res.status(400).json({ message: "Your are not registered !!!" });
        }
        const checkPassword = yield bcrypt_1.default.compare(userPassword, loginUser.userPassword);
        if (!checkPassword) {
            return res.status(400).json({ message: "Incorrect password !!" });
        }
        // if (!process.env.KEY_TOKEN) {
        //     throw new Error('KEY_TOKEN environment variable is not defined.');
        // }
        const token = jsonwebtoken_1.default.sign({ user: loginUser.userEmail }, '987654321', { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
//fetch all user
const fetchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield usersModel_1.default.find({}, { userPassword: 0 });
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchUsers = fetchUsers;
//fetch user by id
const fetchUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield usersModel_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchUserById = fetchUserById;
//patch user by id
const patchUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield usersModel_1.default.updateOne({ _id: id }, req.body);
        if (!user) {
            return res.status(404).json({ message: `Cannot find any user with ID${id}` });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.patchUserById = patchUserById;
//delete user by id
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield usersModel_1.default.deleteOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: `Can not find any user with ID ${id}` });
        }
        res.status(500).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserById = deleteUserById;
