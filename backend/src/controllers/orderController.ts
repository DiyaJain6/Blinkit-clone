import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Order from '../models/Order';
import Product from '../models/Product';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response) => {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'No order items' });
    }

    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Calculate total, check inventory (in real app)
    let totalAmount = 0;
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
            return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
        }
        totalAmount += item.priceAtPurchase * item.quantity;
    }

    // Assume estimated delivery is 15 minutes from now for Blinkit clone
    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 15);

    // For a real app, external payment gateway integration (Stripe/Razorpay) would go here.
    // For this Blinkit clone, we'll mark digital payments as 'Completed' immediately for the mock flow.
    const paymentStatus = paymentMethod === 'COD' ? 'Pending' : 'Completed';

    const order = await Order.create({
        user: req.user._id,
        items,
        deliveryAddress,
        paymentMethod,
        paymentStatus,
        totalAmount,
        estimatedDeliveryTime,
    });

    res.status(201).json({ success: true, order });
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
};

// @desc    Get order by ID (Tracking)
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name phoneNumber')
        .populate('deliveryAddress')
        .populate('items.product', 'title image price');

    if (order) {
        res.status(200).json({ success: true, order });
    } else {
        res.status(404).json({ success: false, message: 'Order not found' });
    }
};
