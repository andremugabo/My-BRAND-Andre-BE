import supertest, { Test } from 'supertest';
import { Server } from 'http';
import app from '../server'; 
import ContactMsg from '../models/contactMsgModel';
import Users from '../models/usersModel';

let token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWYwZmVhNTEwZTkwYzE4NzMyN2FlZDEiLCJpYXQiOjE3MTAyOTI4MjAsImV4cCI6MTcxMDI5NjQyMH0.qYgh11DgRWMDicx30wjBe00SuwnYNo2F0B6t4VzK6z8';
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

const oneContactMsg ={
    
    name:"MAGURU Kayaga",
    email:"kayaga@gmail.com",
    msg:"Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
    read:"0"
	
};
const createMsg = [
    {
        name:"MAGURU Kayaga",
        email:"kayaga@gmail.com",
        msg:"Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
        read:"0"
      },
      {
        name:"MAGURU Kayaga",
        email:"kayaga@gmail.com",
        msg:"Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
        read:"0"
      },
      {
        name:"MAGURU Kayaga",
        email:"kayaga@gmail.com",
        msg:"Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex al…",
        read:"0"
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
            console.log(token);
            expect(response.body).toHaveProperty('token');
        } catch (error) {
            
            throw error; 
        }
    });
});


describe('ContactMsg APIs',()=>{

    describe('POST Create a ContactNsg',()=>{

        it('Should Create a new ContactMsg', async()=>{
            try {
               const response = await (supertest(app) as any) 
                .post('/contactMsgs')
                .send(oneContactMsg);
                expect(response.status).toEqual(200);
            } catch (error) {
                throw error;
            }
            
        })

        
    })


    describe('Fetch all ContactMsg',()=>{
        

        it('Should fetch all ContactMsg',async ()=>{
            try {
                await ContactMsg.insertMany(createMsg);
                const response = await supertest(app)
                    .get('/contactMsgs')
                    .set('Authorization',`bearer ${token}`)

            expect(response.status).toStrictEqual(200);
            } catch (error) {
                throw error;
            }
        })
    })

    describe('Edit a ContactMsg by Id', () => {
        it('It should Patch one ContactMsg by ID', async () => {
            try {
                let msgId : string = "";
                const getMsg = await ContactMsg.find({});
                // console.log(getUser);
                for (const iterator of getMsg) {
                    msgId = iterator._id.toHexString();
                }
                const response = await supertest(app)
                    .patch(`/readMsg/${msgId}`)
                    .set('Authorization', `bearer ${token}`);
                expect(response.status).toBe(200);
            } catch (error) {
                throw error;
            }
        });
    });

    

});