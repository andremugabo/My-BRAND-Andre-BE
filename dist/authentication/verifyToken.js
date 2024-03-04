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
//FORMAT OF TOKEN
// authorization: Bearer <access_token>
const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token 
        req.myAppToken = bearerToken;
        next();
    }
    else {
        //not authorized 
        res.status(401).json({
            message: "YOUR ARE NOT AUTHORIZED"
        });
    }
};
exports.verifyToken = verifyToken;
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, '987654321');
    const user = yield (0, usersModel_1.getUsersById)(decoded.sub);
    console.log(user + "s");
    const usr = {
        _id: user._id,
        userEmail: user.email,
        userFullName: user.FullName,
        userPassword: user.password,
        isAdmin: user.isAdmin,
    };
    return usr;
});
exports.getUser = getUser;
