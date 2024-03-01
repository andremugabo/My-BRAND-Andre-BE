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
exports.patchContactMsgById = exports.fetchAllContactMsg = exports.createContactMsg = void 0;
const contactMsgModel_1 = __importDefault(require("../models/contactMsgModel"));
//create contactMsg
const createContactMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactMsgs = yield contactMsgModel_1.default.create(req.body);
        res.status(200).json(contactMsgs);
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
        const contactMsgs = yield contactMsgModel_1.default.find({});
        res.status(200).json(contactMsgs);
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
        const { id } = req.params;
        const readMsg = yield contactMsgModel_1.default.findByIdAndUpdate({ _id: id }, { read: '1' }, { new: true });
        if (!readMsg) {
            return res.status(404).json({ message: `Cannot find a message with  ID ${id}` });
        }
        res.status(200).json(readMsg);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.patchContactMsgById = patchContactMsgById;
