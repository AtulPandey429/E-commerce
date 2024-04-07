# E-Commerce Website

## Overview
This project is an e-commerce website developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse products, add them to the cart, and make purchases securely. The website includes features such as user authentication using JWT, password hashing using bcrypt, and payment integration using MindTree.

## Features
- User authentication with JWT (JSON Web Tokens)
- Secure password hashing with bcrypt
- Browse products, add to cart, and make purchases
- Responsive and user-friendly UI components using Ant Design (antd)
- Integration with MindTree for secure payment processing

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-website.git
   cd ecommerce-website
2.Install dependencies:
  npm install

  3.
Certainly! Here's the complete README.md file with all the content and formatting:

markdown
Copy code
# E-Commerce Website

## Overview
This project is an e-commerce website developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse products, add them to the cart, and make purchases securely. The website includes features such as user authentication using JWT, password hashing using bcrypt, and payment integration using MindTree.

## Features
- User authentication with JWT (JSON Web Tokens)
- Secure password hashing with bcrypt
- Browse products, add to cart, and make purchases
- Responsive and user-friendly UI components using Ant Design (antd)
- Integration with MindTree for secure payment processing

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/AtulPandey429/E-commerce.git
   cd ecommerce-website
2. Install dependencies:
```bash
       npm install

3.Set up environment variables:
Create a .env file in the root directory and add the following variables:
```bash
  PORT=5000
  MONGODB_URI=''
  JWT_SECRET=your_jwt_secret
  MINDTREE_API_KEY=your_mindtree_api_key
4.Run the server:

npm run server
Run the client:
Open a new terminal tab and navigate to the client directory:

cd client
npm start
Access the application in your browser at http://localhost:7070.

API Routes
   The following API routes are available:

   GET /api/products: Retrieve all products
   POST /api/auth/register: Register a new user
   POST /api/auth/login: Log in a user
   GET /api/auth/logout: Log out a user
    GET /api/cart: Retrieve the user's cart
    POST /api/cart/add: Add a product to the user's cart
    POST /api/cart/remove: Remove a product from the user's cart
    POST /api/orders: Place a new order
