import mongoose from 'mongoose';
import dotenv from 'dotenv';
import WaterSource from './models/WaterSource.model.js'; // Adjust path to your WaterSource model
import User from './models/user.model.js'; // Adjust path to your User model

dotenv.config();

// Configuration
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://roshansuthar2023:roshan1234@cluster0.3n74hjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const TOTAL_SOURCES_TO_GENERATE = 5;

const sampleVillages = [
  'Rampur', 'Kishanpur', 'Sitapura', 'Begas', 'Manpur', 
  'Jodhpur', 'Nagaur', 'Sikar'
];

const sourceTypes = ['TUBEWELL', 'CANAL-PUMP', 'SUBMERSIBLE', 'WELL'];

/**
 * Helper to get a random element from an array
 */
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Helper to generate random number between min and max
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedWaterSources = async () => {
  try {
    // 1. Connect to Database
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB',MONGO_URI);

    // 2. Fetch Users to associate
    // We need at least one user to be a manager/farmer. 
    // If no users exist, we will create dummy ObjectIds (for testing only).
    const users = await User.find({}, '_id role'); 
    
    let userIds = users.map(u => u._id);

    // Fallback if DB is empty
    if (userIds.length === 0) {
      console.warn('⚠️ No users found in DB. Generating dummy ObjectIds for references.');
      userIds = [
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId()
      ];
    }

    // 3. Generate Water Source Objects
    const waterSources = [];

    for (let i = 0; i < TOTAL_SOURCES_TO_GENERATE; i++) {
      const type = getRandom(sourceTypes);
      const village = getRandom(sampleVillages);
      
      // Select a random manager
      const managerId = getRandom(userIds);

      // Select random connected farmers (excluding the manager if possible, but not strictly required)
      // Pick 1 to 5 random farmers
      const numberOfFarmers = getRandomInt(1, 5);
      const connectedFarmers = [];
      for (let j = 0; j < numberOfFarmers; j++) {
        connectedFarmers.push(getRandom(userIds));
      }

      // Create the object
      const sourceObject = {
        sourceId: `${type}-${String(i + 1).padStart(3, '0')}`, // e.g., TUBEWELL-001
        village: village,
        capacityLPH: getRandomInt(2000, 15000), // Random capacity between 2000 and 15000 LPH
        manager: managerId,
        operationalHours: {
          start: 6,
          end: 18
        },
        connectedFarmers: [...new Set(connectedFarmers)] // Ensure unique IDs in the array
      };

      waterSources.push(sourceObject);
    }

    // 4. Clear existing data (Optional - keeps DB clean)
    // await WaterSource.deleteMany({});
    // console.log('🗑️  Cleared existing Water Sources');

    // 5. Insert new data
    // We use insertMany with { ordered: false } to continue if duplicates (sourceId) exist
    try {
      const docs = await WaterSource.insertMany(waterSources, { ordered: false });
      console.log(`🌱 Successfully seeded ${docs.length} Water Sources!`);
    } catch (error) {
      // Handle duplicate key errors gracefully
      if (error.code === 11000) {
        console.warn('⚠️  Some duplicates were skipped (sourceId must be unique).');
        console.log(`🌱 Seeded ${error.result.nInserted} new Water Sources.`);
      } else {
        throw error;
      }
    }

    // Log sample data for verification
    console.log('--- Sample Generated Object ---');
    console.log(waterSources[0]);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // 6. Close connection
    await mongoose.disconnect();
    console.log('👋 Connection closed');
    process.exit();
  }
};

// Run the seed function
seedWaterSources();