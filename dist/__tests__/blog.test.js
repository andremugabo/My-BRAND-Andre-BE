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
const blogModel_1 = __importDefault(require("../models/blogModel"));
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
const oneBlog = {
    userId: "65e4eeeb2d8dea2ef01e05a3",
    blogCategoryId: "65e5a8d61b6d294fc6c84761",
    blogTitle: "Design",
    blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
    blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
    blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
    blogDate: "2024-03-08T22:52:05.653Z"
};
const createBlogs = [
    {
        userId: "65e4eeeb2d8dea2ef01e05a3",
        blogCategoryId: "65e5a8d61b6d294fc6c84761",
        blogTitle: "Techno",
        blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        blogDate: "2024-03-04T11:29:01.093Z"
    },
    {
        userId: "65e4eeeb2d8dea2ef01e05a3",
        blogCategoryId: "65e5a8d61b6d294fc6c84761",
        blogTitle: "Design",
        blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        blogDate: "2024-03-04T11:36:13.410Z"
    },
    {
        userId: "65e4eeeb2d8dea2ef01e05a3",
        blogCategoryId: "65e5a8d61b6d294fc6c84761",
        blogTitle: "Design",
        blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        blogDate: "2024-03-04T11:36:56.774Z"
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
describe('Blog APIs', () => {
    describe('POST Create a Blog', () => {
        it('Joi validation', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const getLogin = yield usersModel_1.default.findOne({ email: 'andre@gmail.com' });
                // console.log(getLogin);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/createBlogs')
                    .set('Authorization', `bearer ${token}`)
                    .send(" ");
                expect(response.status).toBe(400);
            }
            catch (error) {
                throw error;
            }
        }));
        it('Should Create a new Blog', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const getLogin = yield usersModel_1.default.findOne({ email: 'andre@gmail.com' });
                // console.log(getLogin);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .post('/createBlogs')
                    .set('Authorization', `bearer ${token}`)
                    .send(oneBlog);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('blog');
                expect(response.body.message).toBe('Blog Created');
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch all Blogs', () => {
        it('No blog to display', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield blogModel_1.default.deleteMany({});
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/fetchBlogs');
                expect(response.status).toStrictEqual(404);
            }
            catch (error) {
                throw error;
            }
        }));
        it('Should fetch all blog', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield blogModel_1.default.insertMany(createBlogs);
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get('/fetchBlogs');
                expect(response.status).toStrictEqual(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Fetch Blog by ID', () => {
        it('It should fetch one Blog by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let blogId = "";
                const getBlog = yield blogModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getBlog) {
                    blogId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .get(`/fetchBlogById/${blogId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Edit a Blog by Id', () => {
        it('It should Patch one Blog by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let blogId = "";
                const getBlog = yield blogModel_1.default.find({});
                // console.log(getUser);
                for (const iterator of getBlog) {
                    blogId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .patch(`/patchBlogById/${blogId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            }
            catch (error) {
                throw error;
            }
        }));
    });
    describe('Delete a Blog by Id', () => {
        it('It should delete one Blog by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let blogId = "";
                const getBlog = yield blogModel_1.default.find({});
                for (const iterator of getBlog) {
                    blogId = iterator._id.toHexString();
                }
                const response = yield (0, supertest_1.default)(server_1.default)
                    .delete(`/deleteBlogById/${blogId}`)
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
