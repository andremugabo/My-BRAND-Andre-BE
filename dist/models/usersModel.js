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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUsersById = exports.getUsersByEmail = exports.getUsers = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    userFullName: {
        type: String,
        required: [true, 'Please enter your fullName']
    },
    userEmail: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    userPassword: {
        type: String,
        required: [true, "Please enter your password"]
    },
    userPic: {
        type: String,
    },
    userDesc: {
        type: String,
    }
});
const Users = mongoose_1.default.model('Users', userSchema);
exports.default = Users;
const getUsers = () => Users.find();
exports.getUsers = getUsers;
const getUsersByEmail = (email) => Users.findOne({ email });
exports.getUsersByEmail = getUsersByEmail;
const getUsersById = (id) => Users.findById(id);
exports.getUsersById = getUsersById;
const createUser = (values) => new Users(values).save().then((user) => user.toObject);
exports.createUser = createUser;
const deleteUserById = (id) => Users.findOne({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => Users.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
