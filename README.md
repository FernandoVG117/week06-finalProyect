# API E-COMMERCE 

## DESCRIPTION.

This API serves as the backbone for an E-commerce system, allowing for the management of users, products, categories, shopping carts, and purchase records. It also supports product image uploads via integration with Multer.

## DIAGRAM
![workflow-Diagram](./src/images/e-commerce-API[Academlo].png)

## Features

- **Users**: Full CRUD for user management, including authentication with login.
- **Categories**: Create, read, update, and delete product categories.
- **Products**: Full CRUD for products, with association to categories.
- **Shopping Cart**: Manage the logged-in user's cart, associating products with the cart.
- **Purchases**: Record purchases and retrieve purchase history.
- **Product Images**: Upload, retrieve, and delete product images using Multer.

## Endpoints

### Users

- **POST /api/users**: Create a new user.
- **GET /api/users**: Retrieve all users.
- **PUT /api/users/:id**: Update a user.
- **DELETE /api/users/:id**: Delete a user.
- **POST /api/users/login**: User login.

### Categories

- **POST /api/categories**: Create a new category.
- **GET /api/categories**: Retrieve all categories.
- **DELETE /api/categories/:id**: Delete a category.

### Products

- **POST /api/products**: Create a new product.
- **GET /api/products**: Retrieve all products.
- **GET /api/products/:id**: Retrieve a product by ID.
- **PUT /api/products/:id**: Update a product.
- **DELETE /api/products/:id**: Delete a product.

### Shopping Cart

- **POST /api/cart**: Add a product to the logged-in user's cart.
- **GET /api/cart**: Retrieve the logged-in user's cart.
- - **GET /api/cart/:id**: Retrieve the logged-in user's cart by ID.
- **DELETE /api/cart/:id**: Remove a product from the logged-in user's cart.
- **PUT /api/cart/:id**: Update the quantity of a product in the cart.

### Purchases

- **POST /api/purchases**: Record a purchase.
- **GET /api/purchases**: Retrieve the logged-in user's purchase history.

### Product Images

- **POST /api/product-imgs**: Upload a new product image.
- **GET /api/product-imgs**: Retrieve all product images.
- **DELETE /api/product-imgs/:id**: Delete a product image.

### Documentation
***link:*** https://documenter.getpostman.com/view/37160818/2sAXjJ5Cfa 
