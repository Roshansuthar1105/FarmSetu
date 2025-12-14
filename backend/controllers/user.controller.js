import User from '../models/user.model.js';

// ------------------------------------------------------------------
// 1. SECURE ROUTES (For the Logged-in User)
// ------------------------------------------------------------------

// GET /api/user/profile
// "I want to see my own details"
export const getUserProfile = async (req, res) => {
    try {
        // req.user is already fetched by the 'protect' middleware
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
};

// PATCH /api/user/profile
// "I want to edit my personal details (Name, Address, Mobile)"
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Destructure only the fields we allow the user to update
        // (Preventing them from updating 'role' or 'email' directly if we don't want that)
        const { name, mobileNumber, address, avatar } = req.body;

        if (name) user.name = name;
        if (mobileNumber) user.mobileNumber = mobileNumber;
        if (avatar) user.avatar = avatar;

        // Smart Address Update: Merge existing address with new data
        if (address) {
            user.address = {
                village: address.village || user.address.village,
                city: address.city || user.address.city,
                district: address.district || user.address.district,
                state: address.state || user.address.state,
                pincode: address.pincode || user.address.pincode
            };
        }

        const updatedUser = await user.save();
        res.json(updatedUser);

    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ error: 'Error updating profile' });
    }
};

// ------------------------------------------------------------------
// 2. PUBLIC/SHARED ROUTES (Restoring your old functionality)
// ------------------------------------------------------------------

// GET /api/user/:id
// "I want to see a seller's profile or another farmer"
// This matches your PREVIOUS code's functionality
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // We exclude sensitive data like password and cart for public viewing
        const user = await User.findById(id).select('-password -cart -createdAt');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({ error: 'Error getting user details' }); 
    }
};

// ------------------------------------------------------------------
// 3. FARM MANAGEMENT (New Features)
// ------------------------------------------------------------------

export const addFarm = async (req, res) => {
    try {
        const { farmName, area, areaUnit, coordinates, soilHealth } = req.body;
        const user = await User.findById(req.user._id);

        const newFarm = {
            farmName,
            area,
            areaUnit,
            location: {
                type: 'Point',
                coordinates: coordinates || [0, 0] 
            },
            soilHealth: soilHealth || {}
        };

        user.farms.push(newFarm);
        await user.save();
        res.status(201).json({ message: 'Farm added', farms: user.farms });
    } catch (error) {
        res.status(500).json({ error: 'Error adding farm' });
    }
};

export const updateFarm = async (req, res) => {
    try {
        const { farmId } = req.params;
        const { soilHealth, area, farmName } = req.body;
        const user = await User.findById(req.user._id);
        
        const farm = user.farms.id(farmId);
        if (!farm) return res.status(404).json({ error: 'Farm not found' });

        if (farmName) farm.farmName = farmName;
        if (area) farm.area = area;
        if (soilHealth) {
            farm.soilHealth = { ...farm.soilHealth, ...soilHealth };
            farm.soilHealth.lastTested = Date.now();
        }

        await user.save();
        res.json({ message: 'Farm updated', farm });
    } catch (error) {
        res.status(500).json({ error: 'Error updating farm' });
    }
};

export const deleteFarm = async (req, res) => {
    try {
        const { farmId } = req.params;
        const user = await User.findById(req.user._id);
        user.farms = user.farms.filter(f => f._id.toString() !== farmId);
        await user.save();
        res.json({ message: 'Farm removed', farms: user.farms });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting farm' });
    }
};