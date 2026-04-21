import express from 'express';
import { create, getAll, getOne } from '../controllers/product.controller';
import { isAdmin } from '../middlewares/admin.middleware';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { productSchema } from '../validations/product.validation';

const router = express.Router();
router.post("/", protect, isAdmin, validate(productSchema), create)
router.get("/", getAll)
router.get("/:id", getOne)


export default router;