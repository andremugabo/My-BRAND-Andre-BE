import supertest, { Test } from 'supertest';
import { Server } from 'http';
import app from '../server'; 
import Comment from '../models/commentModel';
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

const oneComment ={
    
    userId:"65e9e6feba5d6c2ad7b0729e",
    blogId:"65e5b07d65cc299c9042be85",
    commentMsg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
    commentDate:"2024-03-06T21:56:18.491+00:00"
	
};
const createComment = [
    {
        userId:"65e9e6feba5d6c2ad7b0729e",
        blogId:"65e5b07d65cc299c9042be85",
        commentMsg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
        commentDate:"2024-03-06T21:56:18.491+00:00"
      },
      {
        userId:"65e9e6feba5d6c2ad7b0729e",
        blogId:"65e5b07d65cc299c9042be85",
        commentMsg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
        commentDate:"2024-03-06T21:56:18.491+00:00"
      },
      {
        userId:"65e9e6feba5d6c2ad7b0729e",
        blogId:"65e5b07d65cc299c9042be85",
        commentMsg:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hen…",
        commentDate:"2024-03-06T21:56:18.491+00:00"
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


describe('Comment APIs',()=>{

    describe('POST Create a Comment',()=>{

        it('Joi validation', async()=>{
            try {
                const getLogin = await Users.findOne({email:'andre@gmail.com'});
                // console.log(getLogin);
               const response = await (supertest(app) as any) 
                .post('/comments')
                .set('Authorization',`bearer ${token}`)
                .send(" ");
                expect(response.status).toBe(400);
            } catch (error) {
                throw error;
            }
            
        })

       

        it('Should Create a new Comment', async()=>{
            try {
                const getLogin = await Users.findOne({email:'andre@gmail.com'});
                // console.log(getLogin);
               const response = await (supertest(app) as any) 
                .post('/comments')
                .set('Authorization',`bearer ${token}`)
                .send(oneComment);
                expect(response.status).toEqual(200);
            } catch (error) {
                throw error;
            }
            
        })

        
    })


    describe('Fetch all Comments',()=>{
        

        it('Should fetch all Comment',async ()=>{
            try {
                await Comment.insertMany(createComment);
                const response = await supertest(app)
                    .get('/comments')
                    .set('Authorization',`bearer ${token}`)

            expect(response.status).toStrictEqual(200);
            } catch (error) {
                throw error;
            }
        })
    })

    
    describe('Fetch a Comment by userId', () => {
        it('It should Patch one Comment by ID', async () => {
            try {
                let uId : string = "";
                const getComment = await Comment.find({});
                // console.log(getUser);
                for (const iterator of getComment) {
                    uId = iterator.userId;
                }
                const response = await supertest(app)
                    .get(`/comment/${uId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });

    




});