import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Address from '../models/Address';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            success: true,
            user,
        });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
};

//   --- ADDRESS MANAGEMENT ---

// @desc    Get user addresses
// @route   GET /api/users/addresses
// @access  Private
export const getUserAddresses = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json({ success: true, count: addresses.length, addresses });
};

// @desc    Add new address
// @route   POST /api/users/addresses
// @access  Private
export const addAddress = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const { title, addressLine, city, state, pincode, lat, lng } = req.body;

    // Use default coordinates [0, 0] if not provided to satisfy MongoDB 2dsphere index requirements
    const longitude = typeof lng === 'number' ? lng : 0;
    const latitude = typeof lat === 'number' ? lat : 0;

    const address = await Address.create({
        user: req.user._id,
        title,
        addressLine,
        city,
        state,
        pincode,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
    });

    res.status(201).json({ success: true, address });
};
