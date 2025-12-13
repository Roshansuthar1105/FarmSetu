import Allocation from '../models/Allocation.model.js';
import WaterSource from '../models/WaterSource.model.js';
import LandRecord from '../models/LandRecord.model.js'; 
import User from '../models/user.model.js';
import WaterRequest from '../models/WaterRequest.model.js';
// Helper: Calculate end time based on start time and duration
const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
};

// 1. GENERATE WEEKLY SCHEDULE (Admin/Head only)
export const generateSchedule = async (req, res) => {
    try {
        const { waterSourceId, startDate } = req.body;
        
        const source = await WaterSource.findById(waterSourceId).populate('connectedFarmers');
        if (!source) return res.status(404).json({ error: "Water source not found" });

        // A. Get Total Command Area (Total Land attached to this source)
        let totalLandArea = 0;
        const farmerLandMap = [];

        for (const farmer of source.connectedFarmers) {
            // Fetch land record for this farmer (Assuming a 1-to-1 or 1-to-many link exists)
            // Simplified here: You might need to sum up multiple records
            const land = await LandRecord.findOne({ farmer: farmer._id });
            const area = land?.areaInAcres || 1; // Default to 1 if no record found for prototype
            
            totalLandArea += area;
            farmerLandMap.push({ farmerId: farmer._id, area });
        }

        // B. Define Available Time (e.g., 7 days * 12 operational hours)
        const operationalHoursPerDay = source.operationalHours.end - source.operationalHours.start;
        const totalAvailableMinutes = operationalHoursPerDay * 60 * 7; // Weekly cycle

        // C. Generate Slots
        let currentSlotStart = new Date(startDate);
        // Set to start hour of the source
        currentSlotStart.setHours(source.operationalHours.start, 0, 0, 0);

        const allocations = [];

        for (const entry of farmerLandMap) {
            // ALGORITHM: (Farmer Area / Total Area) * Total Time
            const allottedMinutes = Math.floor((entry.area / totalLandArea) * totalAvailableMinutes);
            
            if (allottedMinutes > 0) {
                const endTime = addMinutes(currentSlotStart, allottedMinutes);

                allocations.push({
                    farmer: entry.farmerId,
                    waterSource: source._id,
                    startTime: new Date(currentSlotStart),
                    endTime: endTime,
                    durationMinutes: allottedMinutes,
                    status: 'scheduled'
                });

                // Move start time for next farmer
                currentSlotStart = endTime; 
                
                // Logic check: If time crosses operational hours, handle wrapping to next day (omitted for brevity)
            }
        }

        // D. Save to DB
        // Clear old future schedules for this source to avoid overlap
        await Allocation.deleteMany({ 
            waterSource: source._id, 
            startTime: { $gte: new Date(startDate) } 
        });
        
        const savedAllocations = await Allocation.insertMany(allocations);
        res.status(201).json({ message: "Schedule Generated", count: savedAllocations.length, schedule: savedAllocations });

    } catch (error) {
        console.error("Schedule Gen Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 2. GET MY UPCOMING PARCHI (Farmer)
export const getMyParchi = async (req, res) => {
    try {
        const myAllocations = await Allocation.find({ 
            farmer: req.user._id,
            status: { $in: ['scheduled', 'active'] },
            endTime: { $gte: new Date() } // Only future or current slots
        })
        .sort({ startTime: 1 })
        .populate('waterSource', 'sourceId village');

        res.json(myAllocations);
    } catch (error) {
        res.status(500).json({ error: "Error fetching parchi" });
    }
};

// 3. GET LIVE STATUS (Transparency)
export const getLiveStatus = async (req, res) => {
    try {
        const now = new Date();
        const activeSlot = await Allocation.findOne({
            startTime: { $lte: now },
            endTime: { $gte: now }
        })
        .populate('farmer', 'name avatar') // Show who is currently irrigating
        .populate('waterSource', 'village sourceId');

        if (!activeSlot) {
            return res.json({ status: "Idle", message: "Water source is currently free." });
        }

        res.json({ 
            status: "Active", 
            currentFarmer: activeSlot.farmer,
            endsAt: activeSlot.endTime,
            source: activeSlot.waterSource
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching live status" });
    }
};
// 4. NEW: FARMER APPLIES FOR WATER
export const applyForWater = async (req, res) => {
    try {
        const { 
            waterSourceId, 
            preferredDate, 
            durationMinutes, 
            reason,
            farmerId // Destructure the manually sent ID
        } = req.body;

        // 1. Determine Farmer ID (Explicit or Token-based)
        const finalFarmerId = farmerId || (req.user ? req.user._id : null);

        if (!finalFarmerId) {
            return res.status(400).json({ error: "Farmer ID is missing." });
        }

        // 2. Validation
        if (new Date(preferredDate) < new Date()) {
            return res.status(400).json({ error: "Cannot request water for past dates." });
        }

        // 3. Create Request
        const newRequest = new WaterRequest({
            farmer: finalFarmerId,
            waterSource: waterSourceId,
            preferredDate,
            durationMinutes,
            reason
        });

        await newRequest.save();
        
        // 4. Send Response (and stop)
        return res.status(201).json({ 
            message: "Water request submitted successfully!", 
            request: newRequest 
        });

    } catch (error) {
        console.error("Apply Error:", error);
        // prevent sending 500 if 400 was already sent
        if (!res.headersSent) {
            return res.status(500).json({ error: "Failed to submit request." });
        }
    }
};
// 5. NEW: GET MY REQUEST STATUS
export const getMyRequests = async (req, res) => {
    try {
        const requests = await WaterRequest.find({ farmer: req.user._id }).sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: "Error fetching requests." });
    }
};
// --- NEW: 6. ADMIN ADDS WATER SOURCE ---
export const createWaterSource = async (req, res) => {
    try {
        const { sourceId, village, capacityLPH, startHour, endHour } = req.body;
        
        const newSource = new WaterSource({
            sourceId,
            village,
            capacityLPH,
            manager: req.user._id,
            operationalHours: { start: startHour, end: endHour }
        });

        await newSource.save();
        res.status(201).json({ message: "Water Source Added Successfully", source: newSource });
    } catch (error) {
        console.error("Create Source Error:", error);
        res.status(500).json({ error: "Failed to add water source" });
    }
};

// --- NEW: 7. GET ALL WATER SOURCES (For Admin & Farmer selection) ---
export const getAllSources = async (req, res) => {
    try {
        // Optional: Filter by village if query param exists
        const filter = req.query.village ? { village: { $regex: req.query.village, $options: 'i' } } : {};
        const sources = await WaterSource.find(filter);
        res.json(sources);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sources" });
    }
};

// --- NEW: 8. ADMIN GETS PENDING REQUESTS ---
export const getAllPendingRequests = async (req, res) => {
    try {
        const requests = await WaterRequest.find({ status: 'pending' })
            .populate('farmer', 'name email')
            .populate('waterSource', 'sourceId village')
            .sort({ preferredDate: 1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: "Error fetching requests" });
    }
};

// --- NEW: 9. ADMIN APPROVES/REJECTS REQUEST ---
export const updateRequestStatus = async (req, res) => {
    try {
        const { requestId, status } = req.body; // status: 'approved' or 'rejected'
        
        const request = await WaterRequest.findById(requestId);
        if (!request) return res.status(404).json({ error: "Request not found" });

        request.status = status;
        await request.save();

        if (status === 'approved') {
            // Create the actual Allocation slot
            const endTime = new Date(new Date(request.preferredDate).getTime() + request.durationMinutes * 60000);
            
            await Allocation.create({
                farmer: request.farmer,
                waterSource: request.waterSource,
                startTime: request.preferredDate,
                endTime: endTime,
                durationMinutes: request.durationMinutes,
                status: 'scheduled'
            });
        }

        res.json({ message: `Request ${status} successfully` });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ error: "Failed to update status" });
    }
};