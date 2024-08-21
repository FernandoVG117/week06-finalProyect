const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/users';
let userId;
let TOKEN;
let TOKEN2;

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
    password: "2user1234",
    phone: "1234567890"
}

    // POST (Create)
test("POST --> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async() => {

    const columns = ["firstName", "lastName", "email", "phone"];

    const res = await request(app)
        .post(`${BASE_URL}`)
        .send(user)    

        userId = res.body.id;
        // console.log(userId)
        // console.log(res.body)

        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();

        columns.forEach((column) => {
            expect(res.body[column]).toBeDefined();
            expect(res.body[column]).toBe(user[column]);
        })

            // For the hashedPassword, only verify if been defined.
        expect(res.body.password).toBeDefined()

})

    // GET (GetAll)
test("GET --> BASE_URL, should return statusCode 200, and res.body.length === 2", async() => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`) 

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(2)
})

    // POST (Login)
test("POST --> BASE_URL/LOGIN, should return statusCode 200, and res.body.user.email === user.email", async() => {
    const userLogin = {
        email: user.email,
        password: user.password
    }

    // console.log(userLogin)
    
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)
    
        // console.log(res.body)
        // TOKEN2 = res.body.token;
        // console.log({TOKEN, TOKEN2})

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        const userProps = ["email"];
        userProps.forEach((item) => {
            expect(res.body.user[item]).toBeDefined()
            expect(res.body.user[item]).toBe(userLogin[item])
        })

        expect(res.body.user.password).toBeDefined()


})

    // PUT (Update)
test("PUT --> BASE_URL, should return statusCode 200, and res.body.user.firstName === userUpdate.firstName", async() => {
    const userUpdate = {
        firstName: "Tester03",
        lastName: "Tester03",
        // email: "test03@email.com",
        // password: "3user1234",
        // phone: "1234567890"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()

        const columns = ['firstName', 'lastName'];
        columns.forEach((item) => {
            expect(res.body[item]).toBeDefined()
            expect(res.body[item]).toBe(userUpdate[item])
        })
})