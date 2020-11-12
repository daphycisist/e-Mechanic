import app from '../app';
import request from 'supertest';

const mockService = {
    "title": "Basic service",
    "description": "Engine oil replacement, Air filter cleaning",
    "price": 14999
}

let id: string;

describe("test services routes", () => {
    
    test("test that admin create a service", async () => {
        const res = await request(app).post("/services/post")
            .send(mockService)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.payload).toHaveLength(1);
        expect(res.body.payload[0].id).toBeDefined();
        id = res.body.payload[0].id;
    })

    test("test that admin can get all services", async () => {
        const res = await request(app).get("/services");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('payload');
    
    });


    test("test that admin can get a single service", async() => {
        const res = await request(app).get(`/services/${id}`)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("service returned successfully");
        expect(res.body.payload).toHaveLength(1);
        expect(res.body.payload[0].id).toBeDefined();

    })

    test("test that admin can update a service", async () => {
        const res = await request(app).put(`/services/${id}`)
            .send({ "price": 30000 })
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', "Service Updated successfully");
        expect(res.body.payload).toHaveLength(1);
        expect(res.body.payload[0].price).toBe(30000);
    })

    test("test that admin can delete a service", async () => {
        const res = await request(app).delete(`/services/${id}`)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', "Service deleted successfully");
        expect(res.body.payload).toHaveLength(1);
    })
})