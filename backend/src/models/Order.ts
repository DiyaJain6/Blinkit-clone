import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
}

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status: 'Placed' | 'Packing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
    deliveryAddress: mongoose.Types.ObjectId;
    paymentMethod: 'UPI' | 'Card' | 'Wallet' | 'COD';
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    estimatedDeliveryTime: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [OrderItemSchema],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['Placed', 'Packing', 'Out for Delivery', 'Delivered', 'Cancelled'],
            default: 'Placed',
        },
        deliveryAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
        paymentMethod: {
            type: String,
            enum: ['UPI', 'Card', 'Wallet', 'COD'],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending',
        },
        estimatedDeliveryTime: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
