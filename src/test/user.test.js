import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import { client } from '../helper/redis.js';
import 'dotenv/config'

let token = null
let dataexist = null
const name = "anton"+Math.random()*5

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    await client.connect();
});

/* Closing database connection after each test. */
 afterEach(async () => {
    await mongoose.connection.close();
    await client.disconnect();
});

describe('POST /user', () => {
    const data = {
        "userName": name,
        "accountNumber": "0000000000"+Math.random()*10,
        "emailAddress": name+"@gmail.com",
        "identityNumber": "0000000000"+Math.random()*10
    }

    it("should return 200 & create user", async () => {
        const res = await request(app).post('/user/register').send(data);
        const generate_token = await request(app).get('/user/generate_token/'+res.body.data[0]._id);
        token = generate_token.body.data[0].token
        dataexist = res.body.data[0]

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("success");
        expect(res.body.data[0]).toHaveProperty('_id','userName','accountNumber','emailAddress','identityNumber');
    });

    it("should return 412 & message username is required when username is empty", async () => {
        const name = "anton"+Math.random();
        const data = {
            "accountNumber": "0000000000"+Math.random(),
            "emailAddress": name+"@gmail.com",
            "identityNumber": "0000000000"+Math.random()
        }
        const res = await request(app).post('/user/register').send(data);
        expect(res.statusCode).toBe(412);
        expect(res.body.message).toEqual("username is required");
    });

    it("should return 412 & message email is required when email is empty", async () => {
        const name = "anton"+Math.random();
        const data = {
            "userName": name,
            "accountNumber": "0000000000"+Math.random(),
            "identityNumber": "0000000000"+Math.random()
        }
        const res = await request(app).post('/user/register').send(data);
        expect(res.statusCode).toBe(412);
        expect(res.body.message).toEqual("email is required");
    });

    it("should return 412 & message identity number is required when identity number is empty", async () => {
        const name = "anton"+Math.random();
        const data = {
            "userName": name,
            "accountNumber": "0000000000"+Math.random(),
            "emailAddress": name+"@gmail.com"
        }
        const res = await request(app).post('/user/register').send(data);
        expect(res.statusCode).toBe(412);
        expect(res.body.message).toEqual("identity number is required");
    });

    it("should return 412 & message account number is required when account number is empty", async () => {
        const name = "anton"+Math.random();
        const data = {
            "userName": name,
            "emailAddress": name+"@gmail.com",
            "identityNumber": "0000000000"+Math.random()
        }
        const res = await request(app).post('/user/register').send(data);
        expect(res.statusCode).toBe(412);
        expect(res.body.message).toEqual("account number is required");
    });

    it("should return 409 & message username/account number/identity number exists when username/account number/identity number duplicate", async () => {
        const res = await request(app).post('/user/register').send(data);
        expect(res.statusCode).toBe(409);
        expect(res.body.message).toEqual("username/account number/identity number exists");
    });
})

describe('GET /user by id', () => {
    it("should return 200 & user data", async () => {
        const res = await request(app).get(`/user/detailsById/${dataexist._id}`).set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data[0]).toHaveProperty('_id','userName','accountNumber','emailAddress','identityNumber');
        expect(res.body.data[0]).toEqual(dataexist);
    });

    it("should return 404 & message not found when id not found", async () => {
        const res = await request(app).get(`/user/detailsById/663680688d8b2ce2a1523f81`).set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual("id not found");
    });
})

describe('GET /user by account number', () => {
    it("should return 200 & user data", async () => {
        const res = await request(app).get(`/user/detailsByAccountNumber/${dataexist.accountNumber}`).set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data[0]).toHaveProperty('_id','userName','accountNumber','emailAddress','identityNumber');
        expect(res.body.data[0]).toEqual(dataexist);
    });

    it("should return 404 & message not found when account number not found", async () => {
        const res = await request(app).get(`/user/detailsByAccountNumber/663680688d8b2ce2a1523f81`).set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual("id not found");
    });
})

describe('GET /user by identity number', () => {
    it("should return 200 & user data", async () => {
        const res = await request(app).get(`/user/detailsByIdentityNumber/${dataexist.identityNumber}`).set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data[0]).toHaveProperty('_id','userName','accountNumber','emailAddress','identityNumber');
        expect(res.body.data[0]).toEqual(dataexist);
    });

    it("should return 404 & message not found when identity number not found", async () => {
        const res = await request(app).get(`/user/detailsByIdentityNumber/663680688d8b2ce2a1523f81`).set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual("id not found");
    });
})

describe('GET /user', () => {
    it("should return 200 & all user", async () => {
        const res = await request(app).get('/user/list').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0]).toHaveProperty('_id','userName','accountNumber','emailAddress','identityNumber');
        expect(res.body.data.length).toBeGreaterThan(0);
    });
})

describe('UPDATE /user', () => {
    it("should return 200 & update user", async () => {
        const res = await request(app).patch(`/user/update/${dataexist._id}`).set('Authorization', `Bearer ${token}`).send({"emailAddress": `${name}@gmail.com"`});
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("success");
    });

    it("should return 404 & message not found when id not found", async () => {
        const res = await request(app).patch('/user/update/663680688d8b2ce2a1523f81').set('Authorization', `Bearer ${token}`).send({"emailAddress": "anton79@gmail.com"});
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual("id not found");
    });
})

describe('DELETE /user', () => {
    it("should return 200 & delete user", async () => {
        const res = await request(app).delete('/user/delete').set('Authorization', `Bearer ${token}`).send({id:dataexist._id});
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("success");
    });

    it("should return 404 & message not found", async () => {
        const res = await request(app).delete('/user/delete').set('Authorization', `Bearer ${token}`).send({id:dataexist._id});
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toEqual("id not found");
    });
})
