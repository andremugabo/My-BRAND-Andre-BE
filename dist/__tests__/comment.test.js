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
const commentModel_1 = __importDefault(require("../models/commentModel"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
let token = '';
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
const oneComment = {
    userId: "65e9e6feba5d6c2ad7b0729e",
    blogId: "65e5b07d65cc299c9042be85",
    commentMsg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
    commentDate: "2024-03-06T21:56:18.491+00:00"
};
const createComment = [
    {
        userId: "65e9e6feba5d6c2ad7b0729e",
        blogId: "65e5b07d65cc299c9042be85",
        commentMsg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
        commentDate: "2024-03-06T21:56:18.491+00:00"
    },
    {
        userId: "65e9e6feba5d6c2ad7b0729e",
        blogId: "65e5b07d65cc299c9042be85",
        commentMsg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
        commentDate: "2024-03-06T21:56:18.491+00:00"
    },
    {
        userId: "65e9e6feba5d6c2ad7b0729e",
        blogId: "65e5b07d65cc299c9042be85",
        commentMsg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
        commentDate: "2024-03-06T21:56:18.491+00:00"
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
            expect(response.body).toHaveProperty('token');
        }
        catch (error) {
            throw error;
        }
    }));
});
describe('Comment APIs', () => {
    describe('POST Create a Comment', () => {
        it('Joi validation', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const getLogin = yield usersModel_1.default.findOne({ email: 'andre@gmail.com' });
                // console.log(getLogin);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/comments')
                    .set('Authorization', `bearer ${token}`)
                    .send(" ");
                expect(response.status).toBe(400);
            }
            catch (error) {
                throw error;
            }
        }));
        it('Should Create a new Comment', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const getLogin = yield usersModel_1.default.findOne({ email: 'andre@gmail.com' });
                // console.log(getLogin);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/comments')
                    .set('Authorization', `bearer ${token}`)
                    .send(oneComment);
                expect(response.status).toEqual(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch all Comments', () => {
        it('Should fetch all Comment', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield commentModel_1.default.insertMany(createComment);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/comments')
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toStrictEqual(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch a Comment by userId', () => {
        it('It should Patch one Comment by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let uId = "";
                const getComment = yield commentModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getComment) {
                    uId = iterator.userId;
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get(`/comment/${uId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
});
