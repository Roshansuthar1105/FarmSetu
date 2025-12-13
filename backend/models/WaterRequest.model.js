import mongoose from 'mongoose';

const WaterRequestSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    waterSource: { type: mongoose.Schema.Types.ObjectId, ref: 'WaterSource', required: true },
    preferredDate: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    reason: { type: String }, // e.g., "Critical crop stage"
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    }
}, { timestamps: true });

const WaterRequest = mongoose.model('WaterRequest', WaterRequestSchema);
export default WaterRequest;