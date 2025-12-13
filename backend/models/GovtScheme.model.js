import mongoose from 'mongoose';

const govtSchemeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    ministry: String,
    benefits: String,
    criteria: {
        minPh: Number,
        maxPh: Number,
        targetCrop: String,
        targetDisease: String
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('GovtScheme', govtSchemeSchema);