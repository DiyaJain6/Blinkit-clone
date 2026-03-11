import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    image: string;
    price: number;
    discount: number;
    quantityOption: string; // e.g., '500g', '1kg', '1 unit'
    category: mongoose.Types.ObjectId;
    inventoryCount: number;
    isAvailable: boolean;
}

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        quantityOption: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        inventoryCount: { type: Number, required: true, default: 0 },
        isAvailable: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes for smart search
ProductSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IProduct>('Product', ProductSchema);
