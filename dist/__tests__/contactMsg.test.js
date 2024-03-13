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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const contactMsgModel_1 = __importDefault(require("../models/contactMsgModel"));
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWYwZmVhNTEwZTkwYzE4NzMyN2FlZDEiLCJpYXQiOjE3MTAyOTI4MjAsImV4cCI6MTcxMDI5NjQyMH0.qYgh11DgRWMDicx30wjBe00SuwnYNo2F0B6t4VzK6z8';
let server;
beforeAll(() => {
    server = server_1.default.listen();
});
afterAll((done) => {
    server.close(done);
});
const admin = {
    FullName: 'MUGABO Andre',
    email: 'andre@gmail.com',
    password: '123456',
    isAdmin: true
};
const oneContactMsg = {
    name: "MAGURU Kayaga",
    email: "kayaga@gmail.com",
    msg: "Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
    read: "0"
};
const createMsg = [
    {
        name: "MAGURU Kayaga",
        email: "kayaga@gmail.com",
        msg: "Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
        read: "0"
    },
    {
        name: "MAGURU Kayaga",
        email: "kayaga@gmail.com",
        msg: "Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
        read: "0"
    },
    {
        name: "MAGURU Kayaga",
        email: "kayaga@gmail.com",
        msg: "Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
        read: "0"
    }
];
describe('User login', () => {
    it('Should Check if user exist and Generate Token', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const loggedUser = {
                email: 'andre@gmail.com',
                password: '123456',
            };
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/user')
                .send(loggedUser);
            token = response.body.token;
            console.log(token);
            expect(response.body).toHaveProperty('token');
        }
        catch (error) {
            throw error;
        }
    }));
});
describe('ContactMsg APIs', () => {
    describe('POST Create a ContactNsg', () => {
        it('Should Create a new ContactMsg', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/contactMsgs')
                    .send(oneContactMsg);
                expect(response.status).toEqual(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch all ContactMsg', () => {
        it('Should fetch all ContactMsg', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield contactMsgModel_1.default.insertMany(createMsg);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/contactMsgs')
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toStrictEqual(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Edit a ContactMsg by Id', () => {
        it('It should Patch one ContactMsg by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let msgId = "";
                const getMsg = yield contactMsgModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getMsg) {
                    msgId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .patch(`/readMsg/${msgId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
});
