require('../models');
const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

let TOKEN;
let user;
let userId;
let category;
let categoryId;
let product;
let productId;
let cart;

const BASE_URL_LOGIN = '/api/v1/users/login';
const BASE_URL = '/api/v1/purchase';

beforeAll(async()=>{
    user = {
        email: "test@email.com",
        password: "user1234",
    };
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user)
        // console.log(res.body)
        TOKEN = res.body.token;
        userId = res.body.user.id;

    category = await Category.create({
        name: "Videogames",
    });
    categoryId = category.id;
    // console.log(category);

    product = await Product.create({
        title: "Stellar Blase",
        description: "A new adventure story for PlayStation 5",
        price: 1600,
        categoryId: category.id,
    });
    productId = product.id;
    // console.log(productId);
});

afterAll(async() => {
    await Category.destroy({where: {id: category.id}});
    await Product.destroy({where: {id: productId}})
    await Cart.destroy({where: {userId}});
})

    // POST/GET --> Create
test("POST --> BASE_URL, should return statusCode 201 and ", async() => {
    cart = await Cart.create({
        userId: userId,
        productId: productId,
        quantity: 5,
    })

    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

        // console.log(res.body)

        expect(res.statusCode).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
        const columns = ['userId', 'productId', 'quantity'];
        columns.forEach((column)=>{
            expect(res.body[0][column]).toBe(cart[column])
        })
})