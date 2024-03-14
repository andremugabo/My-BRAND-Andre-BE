"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const usersModel_1 = __importStar(require("../models/usersModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = require("../authentication/verifyToken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FullName, email, password } = req.body;
        console.log(FullName);
        console.log(email);
        console.log(password);
        // Validate required fields
        if (!FullName || !email || !password) {
            return res.status(400).json({ message: "Please provide all required information to create a user!" });
        }
        const { error } = (0, usersModel_1.joiUserValidation)(req.body);
        if (error) {
            console.error(error);
            res.status(400).json({ error: error.details[0].message });
        }
        // Check if email already exists
        const checkIfEmailExist = yield usersModel_1.default.findOne({ email });
        if (checkIfEmailExist) {
            return res.status(400).json({ message: "A user is registered with the same email, Try another email, or Login " });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create user with hashed password
        const user = yield usersModel_1.default.create({
            FullName,
            email,
            password: hashedPassword,
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
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please Provide your Email and Password" });
        }
        const loginUser = yield usersModel_1.default.findOne({ email });
        if (!loginUser) {
            return res.status(400).json({ message: "Your are not registered !!!" });
        }
        const checkPassword = yield bcrypt_1.default.compare(password, loginUser.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Incorrect password !!" });
        }
        const payload = {
            sub: loginUser.id,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_DECODE_KEY, { expiresIn: '1h' });
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
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const users = yield usersModel_1.default.find({}, { password: 0 });
            res.status(200).json(users);
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO FETCH USERS" });
        }
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
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const { id } = req.params;
            const user = yield usersModel_1.default.findById(id, { password: 0 });
            res.status(200).json(user);
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO FETCH A USER" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchUserById = fetchUserById;
//patch user by id
const patchUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here");
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const { id } = req.params;
            const user = yield usersModel_1.default.updateOne({ _id: id }, req.body);
            if (!user) {
                return res.status(404).json({ message: `Cannot find any user with ID${id}` });
            }
            res.status(200).json({ user, message: "USERS UPDATED SUCCESSFULLY" });
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO EDIT A USER" });
        }
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
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const { id } = req.params;
            const user = yield usersModel_1.default.deleteOne({ _id: id });
            if (!user) {
                return res.status(404).json({ message: `Can not find any user with ID ${id}` });
            }
            res.status(500).json({ user, message: "USER DELETED SUCCESSFULLY " });
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO DELETE A USER" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserById = deleteUserById;
