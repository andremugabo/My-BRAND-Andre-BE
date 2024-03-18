import supertest, { Test } from 'supertest';
import { Server } from 'http';
import app from '../server'; 
import Blog from '../models/blogModel';
import Users from '../models/usersModel';

let token:string = '';
let server: Server;


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
    
		blogCategoryId: "65e5a8d61b6d294fc6c84761",
		blogTitle: "Design",
		blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
		blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
		blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
		blogDate: "2024-03-08T22:52:05.653Z"
	
};
const createBlogs = [
    {
        blogCategoryId: "65e5a8d61b6d294fc6c84761",
        blogTitle: "Techno",
        blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        blogDate: "2024-03-04T11:29:01.093Z"
      },
      {
        blogCategoryId: "65e5a8d61b6d294fc6c84761",
        blogTitle: "Design",
        blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        blogDate: "2024-03-04T11:36:13.410Z"
      },
      {
        blogCategoryId: "65e5a8d61b6d294fc6c84761",
        blogTitle: "Design",
        blogDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui",
        blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non., Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit, odio nec porttitor feugiat, eros ante rutrum sem, eu vehicula libero justo id dui. Morbi tempus sagittis purus placerat cursus. Aenean non scelerisque elit. Proin nisl dolor, pellentesque nec purus in, pharetra varius elit. Mauris mi felis, rhoncus non fermentum ac, egestas eu libero. Cras et dolor felis. Nulla nibh justo, elementum id faucibus ac, cursus auctor justo. Suspendisse id ligula quis metus scelerisque dapibus at eu ex. Nam tincidunt erat leo, volutpat luctus dui gravida non.,",
        blogImg: "https://plus.unsplash.com/premium_photo-1664475382326-3dc5510e4ff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RFJPTkV8ZW58MHx8MHx8fDA%3D",
        blogDate: "2024-03-04T11:36:56.774Z"
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


describe('Blog APIs',()=>{

    describe('POST Create a Blog',()=>{

        it('Joi validation', async()=>{
            try {
                const getLogin = await Users.findOne({email:'andre@gmail.com'});
                // console.log(getLogin);
               const response = await (supertest(app) as any) 
                .post('/createBlogs')
                .set('Authorization',`bearer ${token}`)
                .send(" ");
                expect(response.status).toBe(400);
            } catch (error) {
                throw error;
            }
            
        })

       

        it('Should Create a new Blog', async()=>{
            try {
                const getLogin = await Users.findOne({email:'andre@gmail.com'});
                // console.log(getLogin);
               const response = await (supertest(app) as any) 
                .post('/createBlogs')
                .set('Authorization',`bearer ${token}`)
                .send(oneBlog);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('blog');
                expect(response.body.message).toBe('Blog Created');
            } catch (error) {
                throw error;
            }
            
        })

        
    })


    describe('Fetch all Blogs',()=>{
        it('No blog to display',async ()=>{
            try {
                await Blog.deleteMany({});
                const response = await supertest(app)
                    .get('/fetchBlogs')
            expect(response.status).toStrictEqual(404);
            } catch (error) {
                throw error;
            }
        })


        it('Should fetch all blog',async ()=>{
            try {
                await Blog.insertMany(createBlogs);
                const response = await supertest(app)
                    .get('/fetchBlogs')
            expect(response.status).toStrictEqual(200);
            } catch (error) {
                throw error;
            }
        })
    })

    describe('Fetch Blog by ID',()=>{
        it('It should fetch one Blog by ID', async () => {
            try {
                let blogId : string = "";
                const getBlog = await Blog.find({});
                // console.log(getUser);
                for (const iterator of getBlog) {
                    blogId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .get(`/fetchBlogById/${blogId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    })

    describe('Edit a Blog by Id', () => {
        it('It should Patch one Blog by ID', async () => {
            try {
                let blogId : string = "";
                const getBlog = await Blog.find({});
                // console.log(getUser);
                for (const iterator of getBlog) {
                    blogId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .patch(`/patchBlogById/${blogId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });

    describe('Delete a Blog by Id', () => {
        it('It should delete one Blog by ID', async () => {
            try {
                let blogId : string = "";
                const getBlog = await Blog.find({});
                for (const iterator of getBlog) {
                    blogId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .delete(`/deleteBlogById/${blogId}`)
                    .set('Authorization', `bearer ${token}`);
                // console.log(response.status);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });




});