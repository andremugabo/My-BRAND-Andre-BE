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
exports.getUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersModel_1 = require("../models/usersModel");
const verifyToken = (req, res, next) => {
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
        req.myAppToken = bearerToken;
        // Call the next middleware
        next();
    }
    else {
        // Not authorized 
        res.status(401).json({ message: 'PLEASE PROVIDE THE CORRECT TOKEN ' });
    }
};
exports.verifyToken = verifyToken;
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, '987654321');
        const user = yield (0, usersModel_1.getUsersById)(decoded.sub);
        if (!user) {
            console.error("User not found");
            return null; // Return null if user is not found
        }
        return user;
    }
    catch (error) {
        console.error("Error while decoding token or fetching user:", error);
        return null; // Return null if any error occurs
    }
});
exports.getUser = getUser;
