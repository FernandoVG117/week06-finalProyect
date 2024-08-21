const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/users';
let TOKEN;

beforeAll(async() => {
    const user = {
        email: "test@email.com",
        password: "user1234",
    };
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)

        TOKEN = res.body.token;

        // console.log(TOKEN)
})

const user = {
    firstName: "Tester02",
    lastName: "Tester02",
    email: "test02@email.com",
    password: "user1234",
    phone: "1234567890"
}

test("POST --> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async() => {

    const columns = ["firstName", "lastName", "email", "phone"];

    const res = await request(app)
        .post(`${BASE_URL}`)
        .send(user)    

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();

        columns.forEach((column) => {
            expect(res.body[column]).toBeDefined();
            expect(res.body[column]).toBe(user[column]);
        })

            // For the hashed password, onlye verify if been defined.
        expect(res.body.password).toBeDefined()

})
