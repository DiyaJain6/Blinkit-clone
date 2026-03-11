import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress extends Document {
    user: mongoose.Types.ObjectId;
    title: string; // e.g., 'Home', 'Office'
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    location: {
        type: string;
        coordinates: number[];
    };
}

const AddressSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        location: {
            type: { type: String, enum: ['Point'], default: 'Point' },
            coordinates: { type: [Number], required: true }, // [longitude, latitude]
        },
    },
    { timestamps: true }
);

AddressSchema.index({ location: '2dsphere' });

export default mongoose.model<IAddress>('Address', AddressSchema);
