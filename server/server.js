import express from "express";
import cors from "cors";
import databaseConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

// Connect to the database
databaseConnect();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve static files from the 'dist' folder within 'client'
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
