import express from 'express';
import registerUser from '../controllers/authControllers.js';
const routes = express.Router();

routes.post('/register', registerUser)


export default routes;