import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import productRoutes from "./routes/product.routes"

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);



export default app;