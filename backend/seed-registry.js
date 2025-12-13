import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import LandRecord from './models/LandRecord.model.js';

dotenv.config();

// Jaipur Coordinates
const CENTER_LAT = 26.9124;
const CENTER_LNG = 75.7873;

const seedRegistry = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to DB for seeding...");

        // 1. Fetch existing users (Farmers)
        const farmers = await User.find({ role: 'farmer' }).limit(50);
        
        if (farmers.length === 0) {
            console.log("No farmers found. Please create users first.");
            process.exit();
        }

        console.log(`Found ${farmers.length} farmers. Creating Land Records...`);

        // 2. Clear old records to avoid duplicates during testing
        await LandRecord.deleteMany({});

        // 3. Generate Data
        const records = farmers.map(farmer => {
            // Random offset for coordinates (~10-20km radius around Jaipur)
            const latOffset = (Math.random() - 0.5) * 0.2; 
            const lngOffset = (Math.random() - 0.5) * 0.2;

            return {
                farmer: farmer._id,
                location: {
                    type: 'Point',
                    coordinates: [CENTER_LNG + lngOffset, CENTER_LAT + latOffset]
                },
                soilDetails: {
                    nitrogen: Math.floor(Math.random() * 100),
                    phosphorus: Math.floor(Math.random() * 100),
                    potassium: Math.floor(Math.random() * 100),
                    ph: (Math.random() * 7 + 3).toFixed(1), // pH between 3.0 and 10.0
                    moisture: Math.floor(Math.random() * 100)
                },
                currentCrop: ['Wheat', 'Rice', 'Maize', 'Bajra'][Math.floor(Math.random() * 4)],
                activeDiseases: Math.random() > 0.7 ? [{ 
                    diseaseName: 'Leaf Blight', 
                    confidence: 95 
                }] : []
            };
        });

        await LandRecord.insertMany(records);
        console.log("✅ Seeded 50 Land Records near Jaipur!");
        process.exit();

    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedRegistry();