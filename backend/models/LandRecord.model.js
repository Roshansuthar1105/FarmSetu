import mongoose from 'mongoose';

const landRecordSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // One primary record per farmer for simplicity
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    soilDetails: {
        nitrogen: Number,
        phosphorus: Number,
        potassium: Number,
        ph: Number,
        moisture: Number, // Mapped from humidity/rainfall if needed
        lastTested: { type: Date, default: Date.now }
    },
    currentCrop: String,
    activeDiseases: [{
        diseaseName: String,
        detectedAt: { type: Date, default: Date.now },
        confidence: Number
    }]
}, { timestamps: true });

// Create geospatial index for heatmap queries
landRecordSchema.index({ location: '2dsphere' });

export default mongoose.model('LandRecord', landRecordSchema);