import express from "express";
import { getUserCart, updateUserCart } from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();
router.post("/", protect, updateUserCart);
router.get("/", protect, getUserCart);

export default router;
