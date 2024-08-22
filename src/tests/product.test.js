const request = require('supertest');
const app = require('../app');

beforeAll(async() => {
    const BASE_URL2 = '/api/v1/users';
    const user = {
        email: "test@email.com",
        password: "user1234",
    };
    const res = await request(app)
        .post(`${BASE_URL2}/login`)
        .send(user)

        TOKEN = res.body.token;

        // console.log(TOKEN)
})

let TOKEN;
let productId;

const BASE_URL = '/api/v1/products';
const  product = {
    title: "Stellar Blade",
    description: "The future of humanity is at stake in Stellar Blade, a new action-adventure story for PlayStation®5. Earth has been abandoned, ravaged by powerful and strange creatures, and the remnants of the decimated human race have escaped to a colony in outer space. From the Colony, EVE, a member of the VII Air Squadron, arrives on our desolate planet with a mission: save humanity and take back Earth from the clutches of the Naytibas, the malevolent force that has laid waste to everything. However, as EVE solves the mysteries of the past in the ruins of human civilization and defeats the Naytibas one by one, she realizes that her mission is not as simple as she thought. In fact, nothing will be as easy as it seems…",
    price: 1600,
}

    // POST (Create) 🔐
test("POST --> BASE_URL, should return statusCode 201, and res.body.title === product.title", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

        // console.log(res.body)
        productId = res.body.id;
        // console.log(productId)

        expect(res.statusCode).toBe(201)
        expect(res.body).toBeDefined()
        const columns = ['title', 'description', 'price'];
        columns.forEach((column)=>{
            expect(res.body[column]).toBeDefined()
            expect(res.body[column]).toBe(product[column])
        })
})

    // GET (GetAll)
test("GET --> BASE_URL, should return statusCode 200 and res.body.length === 1", async() => {
    const res = await request(app)
        .get(BASE_URL)

        // console.log(res.body)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

    // GET (GetOne)
test("GET --> BASE_URL/:id, should return statusCode 200, and res.body.title === product.title", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)

        // console.log(res.body)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        const columns = ['title', 'description', 'price'];
        columns.forEach((column)=>{
            expect(res.body[column]).toBeDefined()
            expect(res.body[column]).toBe(product[column])
        })
})