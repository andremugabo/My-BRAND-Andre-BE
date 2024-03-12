import supertest, { Test } from 'supertest';
import { Server } from 'http';
import app from '../server'; 
import Category from '../models/bCategoryModel';
import Users from '../models/usersModel';

let token:string = '';
let server: Server;

beforeAll(async () => {
        await Category.deleteMany({}); 
    });

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

const oneCategory ={category:'Tech'};
const createCategories = [
    {
        category:'Mobile'
    },
    {
       category:'Techno'
    },
    {
        category:'Drone'
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

describe('Categories API',()=>{
    describe('POST Create Category', () => {
        it('should create a new Category', async () => {
            try {
                const response = await (supertest(app) as any)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send(oneCategory);
                    // console.log(oneCategory);
                    // console.log(response.status);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('_id');
            } catch (error) {
                
                throw error;
            }
        });


        it('Missing of required information to create a category', async () => {
            try {
                const response = await (supertest(app) as any)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send("");
                    // console.log(oneCategory);
                    // console.log(response.status);
                expect(response.status).toBe(400);
                expect(response.body).toBeNaN;
            } catch (error) {
                
                throw error;
            }
        });

        it('should  provide required information to create a category', async () => {
            try {
                const response = await (supertest(app) as any)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send("");
                    console.log(response.status);
                expect(response.status).toStrictEqual(400);
                expect(response.body).toBeNaN;
            } catch (error) {
                
                throw error;
            }
        });

        it('Category exist  ', async () => {
            try {
                let name : string = "";
                const getCategory = await Category.find({});
                console.log(getCategory);
                for (const iterator of getCategory) {
                    name = iterator.category;
                }
                const response = await (supertest(app) as any)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send(name);
                    console.log(response.status);
                expect(response.status).toStrictEqual(400);
            } catch (error) {
                
                throw error;
            }
        });


        it('Validation Error  ', async () => {
            try {
                let name : string = "";
                const getCategory = await Category.find({});
                console.log(getCategory);
                for (const iterator of getCategory) {
                    name = iterator.category;
                }
                const response = await (supertest(app) as any)
                    .post('/category')
                    .set('Authorization', `bearer ${token}`)
                    .send("");
                    console.log(response.status);
                expect(response.status).toStrictEqual(400);
            } catch (error) {
                
                throw error;
            }
        });


    });

    describe('Fetch all Categories', () => {
        it('It should fetch all Categories', async () => {
            try {
                await Category.insertMany(createCategories);
                const response = await supertest(app)
                    .get('/categories')
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toStrictEqual(200);
            } catch (error) {
                
                throw error; 
            }
        });

        it('Login first ', async () => {
            try {
                await Category.insertMany(createCategories);
                const response = await supertest(app)
                    .get('/categories')
                expect(response.status).toStrictEqual(401);
            } catch (error) {
                
                throw error; 
            }
        });


    });

    describe('Delete a Category by Id', () => {
        it('It should delete one Category by ID', async () => {
            try {
                let categoryId : string = "";
                const getCategory = await Category.find({});
                // console.log(getUser);
                for (const iterator of getCategory) {
                    categoryId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .delete(`/category/${categoryId}`)
                    .set('Authorization', `bearer ${token}`);
                // console.log(response.status);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });






})