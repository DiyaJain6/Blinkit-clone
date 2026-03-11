import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    getUserAddresses,
    addAddress,
} from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/addresses')
    .get(protect, getUserAddresses)
    .post(protect, addAddress);

export default router;
