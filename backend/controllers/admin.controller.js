import LandRecord from '../models/LandRecord.model.js';
import User from '../models/user.model.js';

// GET /api/admin/heatmap
export const getHeatmapData = async (req, res) => {
    try {
        const { parameter } = req.query; // e.g., 'soilDetails.ph' or 'activeDiseases'
        
        const records = await LandRecord.find({ 'location.coordinates': { $exists: true } })
                                        .select('location soilDetails activeDiseases');

        const heatmapPoints = records.map(record => {
            let weight = 1; // Default weight

            // Adjust weight based on parameter intensity
            if (parameter === 'ph') weight = record.soilDetails?.ph || 0;
            if (parameter === 'nitrogen') weight = record.soilDetails?.nitrogen || 0;
            if (parameter === 'disease' && record.activeDiseases.length > 0) weight = 10; // High intensity for infected areas

            return {
                lat: record.location.coordinates[1],
                lng: record.location.coordinates[0],
                weight: weight
            };
        });

        res.json(heatmapPoints);
    } catch (error) {
        console.error("Heatmap Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /api/admin/schemes/match
export const matchSchemeBeneficiaries = async (req, res) => {
    try {
        const { criteria } = req.body; // e.g., { minPh: 0, maxPh: 5.5 }
        
        const query = {};
        
        if (criteria.maxPh) {
            query['soilDetails.ph'] = { $lt: criteria.maxPh };
        }
        if (criteria.targetDisease) {
            query['activeDiseases.diseaseName'] = criteria.targetDisease;
        }

        // Find matching land records and populate farmer details
        const eligibleFarmers = await LandRecord.find(query).populate('farmer', 'name email role');
        
        res.json(eligibleFarmers);
    } catch (error) {
        res.status(500).json({ error: "Error matching schemes" });
    }
};