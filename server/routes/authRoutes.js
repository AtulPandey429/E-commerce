import express from "express";
import { registerUser, loginUser, forgetPassword, updateProfile } from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";

const routes = express.Router();

//register route
routes.post("/register", registerUser);

//login route
routes.post("/login", loginUser);

//dashboard route
routes.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//admin route
routes.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//forgetPassword route
routes.post("/forgotpassword", forgetPassword);

// route to update userprofile
routes.put("/user-profile", requireSignIn, updateProfile);


export default routes;
