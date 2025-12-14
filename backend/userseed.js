import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js'; // Ensure path matches your folder structure

dotenv.config();

// Sample Data for Randomization
const villages = ['Rampura', 'Kishanpur', 'Bassi', 'Chomu', 'Sanganer', 'Amer','Sitapure'];
const cities = ['Jaipur', 'Bikaner', 'Sikar', 'Ajmer', 'Tonk','Kota','Jodhpur'];
const districts = ['Jaipur', 'Bikaner', 'Sikar', 'Ajmer', 'Tonk','Kota','Jodhpur'];

// Helper to get random item
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to generate random coordinates around Jaipur (26.9° N, 75.7° E)
// This ensures your Heatmap has data to display immediately
const getRandomLocation = () => {
    const lat = 26.9 + (Math.random() - 0.5) * 0.5; // +/- 0.25 degrees
    const lng = 75.7 + (Math.random() - 0.5) * 0.5;
    return [lng, lat]; // MongoDB GeoJSON expects [Longitude, Latitude]
};

const seedUsers = async () => {
    try {
        // 1. Connect to DB
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('✅ Connected to MongoDB for Seeding...');

        // 2. Fetch all users
        const users = await User.find({});
        console.log(`🔍 Found ${users.length} users. Checking for updates...`);

        let updatedCount = 0;

        for (const user of users) {
            let isUpdated = false;

            // A. Add Mobile Number if missing
            if (!user.mobileNumber) {
                user.mobileNumber = '98' + Math.floor(10000000 + Math.random() * 90000000); // Random Indian mobile
                isUpdated = true;
            }

            // B. Add Address if missing
            if (!user.address || !user.address.city) {
                user.address = {
                    village: getRandom(villages),
                    city: getRandom(cities),
                    district: getRandom(districts),
                    state: 'Rajasthan',
                    pincode: '3020' + Math.floor(10 + Math.random() * 90)
                };
                isUpdated = true;
            }

            // C. Add Default Farm if missing (Only for Farmers)
            if (user.role === 'farmer' && (!user.farms || user.farms.length === 0)) {
                user.farms = [{
                    farmName: `${user.name}'s Farm`,
                    area: Math.floor(2 + Math.random() * 10), // Random 2-10 acres
                    areaUnit: 'acre',
                    location: {
                        type: 'Point',
                        coordinates: getRandomLocation(),
                        address: 'Near Village Temple'
                    },
                    soilHealth: {
                        nitrogen: Math.floor(20 + Math.random() * 40),   // Random N
                        phosphorus: Math.floor(10 + Math.random() * 30), // Random P
                        potassium: Math.floor(10 + Math.random() * 30),  // Random K
                        phLevel: parseFloat((5.5 + Math.random() * 2).toFixed(1)), // pH 5.5 - 7.5
                        moisture: Math.floor(30 + Math.random() * 40),
                        lastTested: new Date()
                    }
                }];
                isUpdated = true;
            }

            // D. Save if changes were made
            if (isUpdated) {
                await user.save({ validateBeforeSave: false }); // Skip strict validation just in case
                updatedCount++;
                process.stdout.write('.'); // Progress dot
            }
        }

        console.log(`\n\n✅ Migration Complete! Updated ${updatedCount} users.`);
        process.exit();

    } catch (error) {
        console.error('\n❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedUsers();