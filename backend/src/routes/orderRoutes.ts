import express from 'express';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .post(protect, createOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/:id')
    .get(protect, getOrderById);

export default router;
