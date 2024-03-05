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
exports.deleteCategory = exports.fetchAllCategory = exports.createCategory = void 0;
const bCategoryModel_1 = __importStar(require("../models/bCategoryModel"));
const verifyToken_1 = require("../authentication/verifyToken");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const { category } = req.body;
            if (!category) {
                return res.status(400).json({ message: "Please provide the category" });
            }
            const { error } = (0, bCategoryModel_1.joiBlogCategoryValidation)(req.body);
            if (error) {
                console.error(error);
                res.status(400).json({ error: error.details[0].message });
            }
            const checkCategoryExist = yield bCategoryModel_1.default.findOne({ category });
            if (checkCategoryExist) {
                return res.status(400).json({ message: "The Category name is already registered" });
            }
            const getCategory = yield bCategoryModel_1.default.create(req.body);
            res.status(200).json(getCategory);
        }
        else {
            res.status(401).json({ message: "YOU NEED TO LOGIN AS ADMIN FIRST" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createCategory = createCategory;
const fetchAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const categories = yield bCategoryModel_1.default.find({});
            console.log(categories);
            if (categories.length === 0) {
                res.status(404).json({ message: "THERE IS NO CATEGORY TO DISPLAY" });
            }
            res.status(200).json(categories);
        }
        else {
            res.status(401).json({ message: "YOU NEED TO LOGIN AS ADMIN FIRST" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllCategory = fetchAllCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, verifyToken_1.getUser)(req.myAppToken);
        if (checkUser && checkUser.isAdmin) {
            const { id } = req.params;
            const category = yield bCategoryModel_1.default.deleteOne({ _id: id });
            if (category.deletedCount === 0) {
                return res.status(404).json({ message: `cannot find any category with ID ${id}` });
            }
            res.status(200).json({ category, message: " CATEGORY DELETED SUCCESSFULLY " });
        }
        else {
            res.status(401).json({ message: "YOU NEED TO LOGIN AS ADMIN FIRST" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteCategory = deleteCategory;
