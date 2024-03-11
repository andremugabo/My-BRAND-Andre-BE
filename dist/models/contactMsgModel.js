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
exports.joiContactMsg = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const contactMsgSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please name is required']
    },
    email: {
        type: String,
        required: [true, 'Please email is required']
    },
    msg: {
        type: String,
        required: [true, 'Please msg is required']
    },
    read: {
        type: String,
        enum: ['1', '0'],
        default: '0'
    }
});
const ContactMsg = mongoose_1.default.model('ContactMsg', contactMsgSchema);
exports.default = ContactMsg;
const joiContactMsg = (contactMsgEntry) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        msg: joi_1.default.string().min(10).max(1000).required(),
        read: joi_1.default.string().valid('1', '0').default('0')
    });
    return schema.validate(contactMsgEntry);
};
exports.joiContactMsg = joiContactMsg;
