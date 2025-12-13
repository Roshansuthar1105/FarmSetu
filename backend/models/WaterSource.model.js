import mongoose from 'mongoose';

const WaterSourceSchema = new mongoose.Schema({
    sourceId: { type: String, required: true, unique: true }, // e.g., "TUBEWELL-01"
    village: { type: String, required: true },
    capacityLPH: { type: Number, required: true }, // Liters Per Hour
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // The admin/head of this source
    operationalHours: {
        start: { type: Number, default: 6 }, // 6 AM
        end: { type: Number, default: 18 }   // 6 PM
    },
    connectedFarmers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // List of farmers using this source
}, { timestamps: true });

const WaterSource = mongoose.model('WaterSource', WaterSourceSchema);
export default WaterSource;