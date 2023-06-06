const request = require ('supertest');
const app = require ('../app');
const Category = require('../models/Category');
require('../models');

let token;
let productsId;

beforeAll(async() => {
    const credentials = {
        email: "testUser@gmail.com",
        password: "testUser12345",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /products should create a products' , async () => {
    const category = await Category.create({ name: "tech" });
    const product = {
        title: "Samsung Galaxi S22 Ultra",
        description: "Fotografía profesional en tu bolsillo.Descubrí infinitas posibilidades para tus fotos con las 4 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados. Perfecta para los amantes del plano detalle. Su zoom óptico te ofrecerá la posibilidad de realizar acercamientos sin que tus capturas pierdan calidad. Experiencia visual increíble. Mirá tus series y películas favoritas con la mejor definición a través de su pantalla Dynamic AMOLED 2X de 6.8 pulgadas. Disfrutá de colores brillantes y detalles precisos en todos tus contenidos.Capacidad y eficiencia. Con su potente procesador y memoria RAM de 12 GB tu equipo alcanzará un alto rendimiento con gran velocidad de transmisión de contenidos y ejecutará múltiples aplicaciones a la vez sin demoras. Desbloqueo facial y dactilar. Máxima seguridad para que solo vos puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido. Batería de duración superior ¡Desenchufate! Con la súper batería de 5000 mAh tendrás energía por mucho más tiempo para jugar, ver series o trabajar sin necesidad de realizar recargas.",
        brand: "Samsung",
        price: "$ 609.999",
        categoryId: category.id
    }
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    productsId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();    
});

test('GET /products', async () => { 
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /products/:id', async () => {
    const productsUpdated = {
        price: "$ 649.99"
    }
    const res = await request(app)
        .put(`/products/${productsId}`)
        .send(productsUpdated)
        .set('Authorization', `Bearer ${ token }`);;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(productsUpdated.name);    
});

test('GET /products/:id', async () => { 
    const res = await request(app).get(`/products/${productsId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productsId);
});

test('DELETE /products/:id', async () => { 
    const res = await request(app)
    .delete(`/products/${productsId}`)
    .set('Authorization', `Bearer ${ token }`);;
    expect(res.status).toBe(204);
});
