import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
};

// @desc    Get products (with filtering, pagination, and smart search)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
    const { category, search, limit = '20', page = '1' } = req.query;

    const query: any = { isAvailable: true };

    // Category filter
    if (category) {
        query.category = category;
    }

    // Smart Search using text index or regex
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
        .populate('category', 'name')
        .skip(skip)
        .limit(limitNum);

    const total = await Product.countDocuments(query);

    res.status(200).json({
        success: true,
        count: products.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        products,
    });
};

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
        res.status(200).json({ success: true, product });
    } else {
        res.status(404).json({ success: false, message: 'Product not found' });
    }
};
