import express from 'express';
import { create, getAll, getOne } from '../controllers/product.controller';
import { isAdmin } from '../middlewares/admin.middleware';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();
router.post("/", protect, isAdmin, create)
router.get("/", getAll)
router.get("/:id", getOne)


export default router;