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
const bCategoryModel_1 = __importDefault(require("../models/bCategoryModel"));
let token = '';
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield bCategoryModel_1.default.deleteMany({});
}));
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
const oneCategory = { category: 'Tech' };
const createCategories = [
    {
        category: 'Mobile'
    },
    {
        category: 'Techno'
    },
    {
        category: 'Drone'
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
describe('Categories API', () => {
    describe('POST Create Category', () => {
        it('should create a new Category', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send(oneCategory);
                // console.log(oneCategory);
                // console.log(response.status);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('_id');
            }
            catch (error) {
                throw error;
            }
        }));
        it('Missing of required information to create a category', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send("");
                // console.log(oneCategory);
                // console.log(response.status);
                expect(response.status).toBe(400);
                expect(response.body).toBeNaN;
            }
            catch (error) {
                throw error;
            }
        }));
        it('should  provide required information to create a category', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send("");
                console.log(response.status);
                expect(response.status).toStrictEqual(400);
                expect(response.body).toBeNaN;
            }
            catch (error) {
                throw error;
            }
        }));
        it('Category exist  ', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let name = "";
                const getCategory = yield bCategoryModel_1.default.find({});
                console.log(getCategory);
                for (const iterator of getCategory) {
                    name = iterator.category;
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send(name);
                console.log(response.status);
                expect(response.status).toStrictEqual(400);
            }
            catch (error) {
                throw error;
            }
        }));
        it('Validation Error  ', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let name = "";
                const getCategory = yield bCategoryModel_1.default.find({});
                console.log(getCategory);
                for (const iterator of getCategory) {
                    name = iterator.category;
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send("");
                console.log(response.status);
                expect(response.status).toStrictEqual(400);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch all Categories', () => {
        it('It should fetch all Categories', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield bCategoryModel_1.default.insertMany(createCategories);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/categories')
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toStrictEqual(200);
            }
            catch (error) {
                throw error;
            }
        }));
        it('Login first ', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield bCategoryModel_1.default.insertMany(createCategories);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/categories');
                expect(response.status).toStrictEqual(401);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Delete a Category by Id', () => {
        it('It should delete one Category by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let categoryId = "";
                const getCategory = yield bCategoryModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getCategory) {
                    categoryId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .delete(`/category/${categoryId}`)
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
