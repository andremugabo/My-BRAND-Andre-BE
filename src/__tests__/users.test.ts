import supertest, { Test } from 'supertest';
import { Server } from 'http';
import app from '../server'; 
import Users from '../models/usersModel';


let token = '';
let server: Server;

beforeAll(async () => {
        await Users.deleteMany({}); 
    });

beforeAll(() => {
    server = app.listen(); 
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
        it('should create a new user', async () => {
            try {
                const response = await (supertest(app) as any)
                    .post('/users')
                    .send(newUser);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('_id');
            } catch (error) {
                
                throw error;
            }
        });

        it('should not provide required information to create a user', async () => {
            try {
                const response = await (supertest(app) as any)
                    .post('/users')
                    .send("");
                    console.log(response.status);
                expect(response.status).toBe(400);
                expect(response.body).toBeNaN;
            } catch (error) {
                
                throw error;
            }
        });

        it('Users exist  ', async () => {
            try {
                let email : string = "";
                const getUser = await Users.find({});
                for (const iterator of getUser) {
                    email = iterator.email;
                }
                const response = await (supertest(app) as any)
                    .post('/users')
                    .send(email);
                    console.log(response.status);
                expect(response.status).toBe(400);
            } catch (error) {
                
                throw error;
            }
        });


    });

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

    describe('Fetch all Users', () => {
        it('It should fetch all users', async () => {
            try {
                await Users.insertMany(manyUsers);
                const response = await supertest(app)
                    .get('/users')
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toStrictEqual(200);
            } catch (error) {
                
                throw error; 
            }
        });
    });

    describe('Fetch a User by Id', () => {
        it('It should fetch one user by ID', async () => {
            try {
                let userId : string = "";
                const getUser = await Users.find({});
                // console.log(getUser);
                for (const iterator of getUser) {
                    userId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .get(`/user/${userId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });
    

    describe('Edit a User by Id', () => {
        it('It should Patch one user by ID', async () => {
            try {
                let userId : string = "";
                const getUser = await Users.find({});
                // console.log(getUser);
                for (const iterator of getUser) {
                    userId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .patch(`/user/${userId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });


    describe('Delete a User by Id', () => {
        it('It should delete one user by ID', async () => {
            try {
                let userId : string = "";
                const getUser = await Users.find({});
                // console.log(getUser);
                for (const iterator of getUser) {
                    userId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .delete(`/user/${userId}`)
                    .set('Authorization', `bearer ${token}`);
                // console.log(response.status);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });




});
