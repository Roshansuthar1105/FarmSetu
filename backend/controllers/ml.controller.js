import MLHistory from '../models/MLHistory.model.js';
import LandRecord from '../models/LandRecord.model.js';

export const logPrediction = async (req, res) => {
    try {
        const { type, inputData, predictionResult } = req.body;
        const userId = req.user._id; // Assumes auth middleware adds user

        // 1. Save to History Log (Timeline)
        const history = new MLHistory({
            user: userId,
            type,
            inputData,
            predictionResult
        });
        await history.save();

        // 2. Update Land Record (The "Current State" for Heatmaps)
        // We upsert (create if not exists) based on the user ID
        const updateData = {};
        
        // Map ML inputs to LandRecord fields based on type
        if (type === 'crop_recommendation') {
            updateData['soilDetails.nitrogen'] = inputData.nitrogen;
            updateData['soilDetails.phosphorus'] = inputData.phosphorus;
            updateData['soilDetails.potassium'] = inputData.potassium;
            updateData['soilDetails.ph'] = inputData.ph;
            // Use user's current location if provided, else default to Jaipur for demo
            if (inputData.latitude && inputData.longitude) {
                 updateData.location = { type: 'Point', coordinates: [inputData.longitude, inputData.latitude] };
            }
        } else if (type === 'disease_detection') {
            // Push to active diseases
            updateData['$push'] = { 
                activeDiseases: { 
                    diseaseName: predictionResult.disease, 
                    confidence: predictionResult.confidence 
                } 
            };
        }

        if (Object.keys(updateData).length > 0) {
            await LandRecord.findOneAndUpdate(
                { farmer: userId },
                updateData,
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
        }

        res.status(201).json({ message: "ML Data logged and Registry updated" });
    } catch (error) {
        console.error("Error logging ML data:", error);
        res.status(500).json({ error: "Failed to log data" });
    }
};

export const getUserHistory = async (req, res) => {
    try {
        const history = await MLHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Error fetching history" });
    }
};