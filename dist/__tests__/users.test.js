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
const usersModel_1 = __importDefault(require("../models/usersModel"));
let token = '';
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield usersModel_1.default.deleteMany({});
}));
beforeAll(() => {
    server = server_1.default.listen();
});
afterAll((done) => {
    server.close(done);
});
const newUser = {
    FullName: 'MUGABO Andre',
    email: 'andre@gmail.com',
    password: '123456',
    isAdmin: true
};
const manyUsers = [
    {
        FullName: 'BINEGO Leilla',
        email: 'leilla@gmail.com',
        password: '123456',
        isAdmin: false
    },
    {
        FullName: 'BISHO David',
        email: 'david@gmail.com',
        password: '123456',
        isAdmin: false
    },
    {
        FullName: 'KANYE Ahmend',
        email: 'ahmed@gmail.com',
        password: '123456',
        isAdmin: false
    }
];
describe('User APIs', () => {
    describe('POST Create user', () => {
        it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/users')
                    .send(newUser);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('_id');
            }
            catch (error) {
                throw error;
            }
        }));
        it('should not provide required information to create a user', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/users')
                    .send("");
                console.log(response.status);
                expect(response.status).toBe(400);
                expect(response.body).toBeNaN;
            }
            catch (error) {
                throw error;
            }
        }));
        it('Users exist  ', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let email = "";
                const getUser = yield usersModel_1.default.find({});
                for (const iterator of getUser) {
                    email = iterator.email;
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/users')
                    .send(email);
                console.log(response.status);
                expect(response.status).toBe(400);
            }
            catch (error) {
                throw error;
            }
        }));
    });
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
                expect(response.body).toHaveProperty('token');
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch all Users', () => {
        it('It should fetch all users', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield usersModel_1.default.insertMany(manyUsers);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/users')
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toStrictEqual(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch a User by Id', () => {
        it('It should fetch one user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let userId = "";
                const getUser = yield usersModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getUser) {
                    userId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get(`/user/${userId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Edit a User by Id', () => {
        it('It should Patch one user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let userId = "";
                const getUser = yield usersModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getUser) {
                    userId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .patch(`/user/${userId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Delete a User by Id', () => {
        it('It should delete one user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let userId = "";
                const getUser = yield usersModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getUser) {
                    userId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .delete(`/user/${userId}`)
                    .set('Authorization', `bearer ${token}`);
                // console.log(response.status);
                expect(response.status).toBe(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
});
