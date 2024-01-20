import express from "express";
const app = express();
import cors from 'cors';
import databaseConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
databaseConnect();
app.use(express.json());

app.use(cors());
// routes

app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
