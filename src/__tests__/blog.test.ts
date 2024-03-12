import supertest, { Test } from 'supertest';
import { Server } from 'http';
import app from '../server'; 
import Blog from '../models/blogModel';
import Users from '../models/usersModel';

let token:string = '';
let server: Server;

// beforeAll(async () => {
//         await Blog.deleteMany({}); 
//     });

beforeAll(() => {
    server = app.listen(); 
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

const oneBlog ={
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
    it('Should Check if user exist and Generate Token', async () => {
        try {
            const loggedUser = {
                email: 'andre@gmail.com',
                password: '123456',
            };
            const response = await (supertest(app) as any)
                .post('/user')
                .send(loggedUser);
            token = response.body.token;
            expect(response.body).toHaveProperty('token');
        } catch (error) {
            
            throw error; 
        }
    });
});