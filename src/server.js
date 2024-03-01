"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 5000;
const connection_url = "mongodb+srv://mugaboandre:NirereNadine1983@cluster0.1518h6w.mongodb.net/MyBrand-Andre?retryWrites=true&w=majority&appName=Cluster0";
app.use(express_1.default.json());
mongoose_1.default.connect(connection_url)
    .then(() => {
    console.log('Connected on MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.log("Error connecting to MOngoDB:", error);
});
