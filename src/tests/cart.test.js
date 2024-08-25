require('../models');
const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

let TOKEN;
let productId;
let cartItemId;
let category;
let product;
let user;
let userId;

const BASE_URL_LOGIN = '/api/v1/users/login';
const BASE_URL = '/api/v1/cart';

beforeAll(async() => {
    user = {
        email: "test@email.com",
        password: "user1234",
    };
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user);

        userId = res.body.user.id;
        // console.log(res.body.user.id)
        TOKEN = res.body.token;
        // console.log(TOKEN)

    category = await Category.create({
        name: "Videogames",
    });
    // console.log(category)
    product = await Product.create({
        title: "Stellar Blase",
        description: "A new adventure story for PlayStation 5",
        price: 1600,
        categoryId: category.id,
    });
    // console.log(product)
});

afterAll(async() => {
    await Category.destroy({where: {id: category.id}});
    await Product.destroy({where: {id: productId}})
    await Cart.destroy({where: {userId}});
})

    // POST --> Create
test("POST --> BASE_URL, should return statusCode 201 and res.body.productId === product.id", async() => {
    const cartItem = {
        productId: product.id,
        quantity: 10,
    };
    const res = await request(app)
        .post(BASE_URL)
        .send(cartItem)
        .set('Authorization', `Bearer ${TOKEN}`)

        // console.log(res.body)
        cartItemId = res.body.id;
        productId = res.body.productId;
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.productId).toBe(product.id)
    expect(res.body.quantity).toBe(cartItem.quantity)
    expect(res.body.userId).toBe(userId)
});