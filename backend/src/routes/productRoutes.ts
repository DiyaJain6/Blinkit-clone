import express from 'express';
import { getProducts, getCategories, getProductById } from '../controllers/productController';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
