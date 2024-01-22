import express from "express";
import { registerUser, loginUser } from "../controllers/authControllers.js";

const routes = express.Router();

//register route
routes.post("/register", registerUser);

//login route
routes.post("/login", loginUser);

//dashboard route
routes.get("/user-auth", (req, res) => {
  res.status(500).send({ ok: true });
});
export default routes;
