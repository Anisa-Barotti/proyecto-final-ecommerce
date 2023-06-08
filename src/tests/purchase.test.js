const request = require ('supertest');
const app = require ('../app');
require('../models');

let token;
let purchaseId;

beforeAll(async() => {
    const credentials = {
        email: "testUser@gmail.com",
        password: "testUser12345",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})

test('GET /purchases', async () => {
    const res = await request(app)
        .get('/purchases')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

/*test('POST /purchases should create one carts ', async () => {
    const purchase = {
        userId: 1, 
        productId: 2, 
        quantity: 2,
    }
    const res = await request(app)
        .post('/purchase')
        .send(purchase)
        .set('Authorization', `Bearer ${token}`);
    purchaseId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});*/

