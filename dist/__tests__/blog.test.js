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
let token = '';
let server;
// beforeAll(async () => {
//         await Blog.deleteMany({}); 
//     });
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
    "blog": {
        "userId": "65e4eeeb2d8dea2ef01e05a3",
        "blogCategoryId": "65e5a8d61b6d294fc6c84761",
        "blogTitle": "Design",
        "blogDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        "blogContent": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        "blogImg": "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        "blogDate": "2024-03-08T22:52:05.653Z",
    }
};
const createBlogs = [
    {
        "userId": "65e4eeeb2d8dea2ef01e05a3",
        "blogCategoryId": "65e5a8d61b6d294fc6c84761",
        "blogTitle": "Techno",
        "blogDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        "blogContent": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        "blogImg": "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        "blogDate": "2024-03-04T11:29:01.093Z",
    },
    {
        "userId": "65e4eeeb2d8dea2ef01e05a3",
        "blogCategoryId": "65e5a8d61b6d294fc6c84761",
        "blogTitle": "Design",
        "blogDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        "blogContent": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        "blogImg": "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        "blogDate": "2024-03-04T11:36:13.410Z",
    },
    {
        "userId": "65e4eeeb2d8dea2ef01e05a3",
        "blogCategoryId": "65e5a8d61b6d294fc6c84761",
        "blogTitle": "Design",
        "blogDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        "blogContent": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        "blogImg": "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        "blogDate": "2024-03-04T11:36:56.774Z",
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
