import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Helper to generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

// Placeholder for OTP storage (in memory for now, ideally Redis)
const otpStore: { [key: string]: string } = {};

// @desc    Initiate Login/Signup by sending OTP
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOtp = async (req: Request, res: Response) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    // Generate a 4-digit OTP (mock)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Store OTP
    otpStore[phoneNumber] = otp;

    // Mock logging for development
    console.log(`
    *****************************************
    [MOCK SMS] OTP SENT TO: ${phoneNumber}
    [MOCK SMS] OTP CODE IS: ${otp}
    [INFO] In dev mode, OTP is also shown on UI hint.
    *****************************************
    `);

    res.status(200).json({
        success: true,
        message: `Mock OTP sent to ${phoneNumber}`,
        mockOtp: otp // Return OTP for easy testing on the UI
    });
};

// @desc    Verify OTP and return token
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req: Request, res: Response) => {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
        return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
    }

    const storedOtp = otpStore[phoneNumber];

    if (!storedOtp || storedOtp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Clear OTP
    delete otpStore[phoneNumber];

    // Check if user exists, else create
    let user = await User.findOne({ phoneNumber });

    if (!user) {
        user = await User.create({
            phoneNumber,
        });
    }

    res.status(200).json({
        success: true,
        user,
        token: generateToken((user._id as any).toString()),
    });
};
