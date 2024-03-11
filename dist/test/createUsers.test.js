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
const chai = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const server_1 = __importDefault(require("../server"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
chai.use(chai_http_1.default);
const expect = chai.expect;
(0, mocha_1.describe)('User API', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield usersModel_1.default.create({});
    }));
    (0, mocha_1.describe)('POST/users', () => {
        (0, mocha_1.it)('Should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = {
                FullName: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                isAdmin: false
            };
            const res = yield chai.request(server_1.default)
                .post('/users')
                .send(newUser);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.FullName).to.equal(newUser.FullName);
            expect(res.body.email).to.equal(newUser.email);
            expect(res.body.password).to.equal(newUser.password);
            expect(res.body.isAdmin).to.equal(newUser.isAdmin);
        }));
        (0, mocha_1.it)('should return an error if required fields are missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidUser = {
                email: 'john@example.com',
                password: 'password123'
            };
            const res = yield chai.request(server_1.default)
                .post('/users')
                .send(invalidUser);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message').that.includes('required information');
        }));
    });
});
