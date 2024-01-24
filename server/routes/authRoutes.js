import express from "express";
import { registerUser, loginUser, forgetPassword } from "../controllers/authControllers.js";
import { requireSignIn } from "./../middlewares/authMiddlewares.js";

const routes = express.Router();

//register route
routes.post("/register", registerUser);

//login route
routes.post("/login", loginUser);

//dashboard route
routes.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//forgetPassword route
routes.post("/forgotpassword", forgetPassword);
export default routes;
