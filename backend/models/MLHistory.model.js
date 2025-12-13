import mongoose from 'mongoose';

const mlHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['crop_recommendation', 'disease_detection', 'rainfall'], required: true },
    inputData: Object, // Stores inputs like { N: 50, P: 30... }
    predictionResult: Object, // Stores outputs like { crop: 'Rice' }
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MLHistory', mlHistorySchema);