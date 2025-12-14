import User from '../models/user.model.js';

// GET /api/admin/users
// View all users (with filtering)
export const getAllUsers = async (req, res) => {
    try {
        const { role, city } = req.query;
        
        let query = {};
        if (role) query.role = role;
        if (city) query['address.city'] = { $regex: city, $options: 'i' }; // Case insensitive search

        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// PATCH /api/admin/user/:id
// Admin can force update a user (e.g., ban them, change role)
export const adminUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

// GET /api/admin/heatmap
// Updated to pull data from User.farms instead of old LandRecord
export const getHeatmapData = async (req, res) => {
    try {
        const { parameter } = req.query; // e.g., 'ph', 'nitrogen'
        
        // Find only users who are farmers and have farms
        const farmers = await User.find({ 
            role: 'farmer', 
            'farms.0': { $exists: true } 
        }).select('farms');

        let heatmapPoints = [];

        farmers.forEach(farmer => {
            farmer.farms.forEach(farm => {
                if (farm.location && farm.location.coordinates) {
                    let weight = 1;

                    // Adjust weight based on soil parameter
                    if (parameter === 'ph') weight = farm.soilHealth?.phLevel || 0;
                    if (parameter === 'nitrogen') weight = farm.soilHealth?.nitrogen || 0;
                    if (parameter === 'phosphorus') weight = farm.soilHealth?.phosphorus || 0;

                    heatmapPoints.push({
                        lat: farm.location.coordinates[1], // Latitude is index 1
                        lng: farm.location.coordinates[0], // Longitude is index 0
                        weight: weight
                    });
                }
            });
        });

        res.json(heatmapPoints);
    } catch (error) {
        console.error("Heatmap Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /api/admin/schemes/match
// Match schemes based on User Farm Data
export const matchSchemeBeneficiaries = async (req, res) => {
    try {
        const { criteria } = req.body; 
        // e.g., { maxPh: 5.5, city: 'Jaipur' }

        // MongoDB Aggregation to filter inside the farms array
        const eligibleFarmers = await User.find({
            role: 'farmer',
            $and: [
                { 'farms.soilHealth.phLevel': { $lt: criteria.maxPh || 14 } }, // Default max pH
                { 'address.city': criteria.city ? { $regex: criteria.city, $options: 'i' } : { $exists: true } }
            ]
        }).select('name email mobileNumber farms');

        res.json(eligibleFarmers);
    } catch (error) {
        console.error("Scheme Match Error:", error);
        res.status(500).json({ error: "Error matching schemes" });
    }
};