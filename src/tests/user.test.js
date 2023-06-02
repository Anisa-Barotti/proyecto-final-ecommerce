const request = require ('supertest');
const app = require ('../app');

let userId;
let token;

test('POST /users', async () => {
    const user = {
        firstName: "Sofia",
        lastName: "Ibañez",
        email: "sofia@gmail.com",
        password: "contraseña actualizada",
        phone: "123456789"
    }  
    const res = await request(app)
        .post('/users')
        .send(user);
    userId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login should do login', async () => {
    const credentials = {
        email: "sofia@gmail.com",
        password: "contraseña actualizada",
    }
    const res = await request(app)  
        .post('/users/login')
        .send(credentials)
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users', async() => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${ token }`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test('PUT /users/:id', async () => {
    const userUpdated = {
        firstName: "Sofia updated"
    }
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(userUpdated)
        .set('Authorization', `Bearer ${ token }`);;
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);    
});



test('POST /users/login with invalid credentials should throw an error', async () => {
    const credentials = {
        email: "invalidsofia@gmail.com",
        password: "invalid contraseña actualizada",
    }
    const res = await request(app)  
        .post('/users/login')
        .send(credentials)
    expect(res.status).toBe(401);
});

test('DELETE /users/:id', async () => { 
    const res = await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${ token }`);;
    expect(res.status).toBe(204);
});