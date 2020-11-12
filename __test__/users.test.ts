import app from '../app';
import request from 'supertest';

const mockuser = {
    "firstname": "Mock",
    "lastname": "User",
    "email": "mockuser@gmail.com",
    "phonenumber": "08065760046",
    "address": "5 Mgbemena street",
    "password": "12345",
}

describe("Test That Users can Register", () => {
    test("test the signup the rout", async () => {
        const res = await request(app).post('/signup').send(mockuser);

    })
})