import express from "express";
import { registerUser, loginUser } from "../controllers/authControllers.js";
import { requireSignIn } from './../middlewares/authMiddlewares.js';
const routes = express.Router();

//register route
routes.post("/register", registerUser);

//login route
routes.post("/login", requireSignIn, loginUser);
export default routes;
