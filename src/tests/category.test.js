const request = require('supertest');
const app = require ('../app');

let token;

beforeAll(async() => {
    const credentials = {
        email: "testUser@gmail.com",
        password: "testUser12345",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})

test('POST /categories should create one category ', async () => {
    const category = {
        name: "Home"
    }
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
})