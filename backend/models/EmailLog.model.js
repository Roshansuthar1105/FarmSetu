// models/EmailLog.model.js
import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema({
    recipient: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    status: {
        type: String,
        enum: ['sent', 'failed', 'scheduled'],
        default: 'sent'
    },
    error: {
        type: String
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

emailLogSchema.index({ sentAt: -1 });
emailLogSchema.index({ recipient: 1 });

export default mongoose.model('EmailLog', emailLogSchema);