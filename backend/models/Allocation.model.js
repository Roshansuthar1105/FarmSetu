import mongoose from 'mongoose';

const AllocationSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    waterSource: { type: mongoose.Schema.Types.ObjectId, ref: 'WaterSource', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['scheduled', 'active', 'completed', 'cancelled'], 
        default: 'scheduled' 
    },
    isMLOptimized: { type: Boolean, default: false } // True if Python ML adjusted this slot
}, { timestamps: true });

const Allocation = mongoose.model('Allocation', AllocationSchema);
export default Allocation;