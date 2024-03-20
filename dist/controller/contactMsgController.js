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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchContactMsgById = exports.fetchAllContactMsg = exports.createContactMsg = void 0;
const contactMsgModel_1 = __importStar(require("../models/contactMsgModel"));
const verifyToken_1 = require("../authentication/verifyToken");
//create contactMsg
const createContactMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, msg, date } = req.body;
        if (!name || !email || !msg || !date) {
            return res.status(400).json({ message: "Please fill out all required information " });
        }
        const { error } = (0, contactMsgModel_1.joiContactMsg)(req.body);
        if (error) {
            console.error(error);
            res.status(400).json({ error: error.details[0].message });
        }
        const contactMsgs = yield contactMsgModel_1.default.create(req.body);
        res.status(200).json({ contactMsgs, status: 200, message: "YOUR MESSAGE SENT SUCCESSFULLY !!" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createContactMsg = createContactMsg;
//fetch all contactMsg
const fetchAllContactMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const contactMsgs = yield contactMsgModel_1.default.find({});
            if (contactMsgs.length !== 0) {
                res.status(200).json(contactMsgs);
            }
            else {
                res.status(404).json({ message: "THERE IS NO MESSAGE TO DISPLAY" });
            }
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO VIEW MESSAGE" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllContactMsg = fetchAllContactMsg;
//patch contactMsg
const patchContactMsgById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const { id } = req.params;
            const readMsg = yield contactMsgModel_1.default.findByIdAndUpdate({ _id: id }, { read: '1' }, { new: true });
            if (!readMsg) {
                return res.status(404).json({ message: `Cannot find a message with  ID ${id}` });
            }
            res.status(200).json(readMsg);
        }
        else {
            res.status(401).json({ message: "YOU ARE NOT AUTHORIZED TO READ MESSAGE" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.patchContactMsgById = patchContactMsgById;
