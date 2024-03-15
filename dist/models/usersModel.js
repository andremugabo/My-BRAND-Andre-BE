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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUsersById = exports.getUsersByEmail = exports.getUsers = exports.joiUserValidation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const userSchema = new mongoose_1.Schema({
    FullName: {
        type: String,
        required: [true, 'Please enter your fullName']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    picture: {
        type: String,
    },
    description: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    }
});
const Users = mongoose_1.default.model('Users', userSchema);
const joiUserValidation = (userEntry) => {
    const schema = joi_1.default.object({
        FullName: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi_1.default.string().required(),
        picture: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        isAdmin: joi_1.default.boolean().optional()
    });
    return schema.validate(userEntry);
};
exports.joiUserValidation = joiUserValidation;
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
