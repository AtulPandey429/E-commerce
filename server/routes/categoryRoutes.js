import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { CreateCategory } from '../controllers/createCategoryController.js';
const routes = express.Router();

routes.post('/create-category',requireSignIn,isAdmin,CreateCategory);

export default routes