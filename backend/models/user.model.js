import mongoose from 'mongoose';
// C:\Users\91787\AI Projects\plant_disease\static\testcase
// 1. Define a Sub-schema for Farm Details
// This handles area, location (map), and soil nutrition specifically for each plot.
const farmSchema = new mongoose.Schema({
    farmName: {
        type: String,
        default: 'My Farm'
    },
    area: {
        type: Number,
        required: true
    },
    areaUnit: {
        type: String,
        enum: ['acre', 'hectare', 'bigha', 'sq_ft'],
        default: 'acre'
    },
    // GeoJSON format for Map Integration
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Format: [Longitude, Latitude]
            required: false // Optional, in case they haven't mapped it yet
        },
        address: {
            type: String // Human readable address for the specific farm
        }
    },
    // Soil Nutrition Parameters
    soilHealth: {
        nitrogen: { type: Number, default: 0 },   // N
        phosphorus: { type: Number, default: 0 }, // P
        potassium: { type: Number, default: 0 },  // K
        phLevel: { type: Number, default: 7 },    // pH
        moisture: { type: Number, default: 0 },   // %
        lastTested: { type: Date }
    }
});

// 2. Define the Main User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
        trim: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true, 
        minlength: 6, 
    },
    mobileNumber: {
        type: String,
        required: false, // Important for farmers, but maybe not for admin
        trim: true
    },
    // Farmer Demographics
    address: {
        village: { type: String, trim: true },
        city: { type: String, trim: true },
        district: { type: String, trim: true },
        state: { type: String, trim: true },
        pincode: { type: String, trim: true }
    },
    role: {
        type: String,
        enum: ['farmer', 'seller', 'cooperative', 'admin'],
        default: 'farmer',
    },
    // Array of Farm Schemas (A farmer can have multiple plots)
    farms: [farmSchema], 
    
    avatar: {
        type: String,
        required: true,
        default: 'https://avataaars.io/?avatarStyle=Transparent&topType=Turban&accessoriesType=Round&hatColor=Blue01&facialHairType=BeardMajestic&facialHairColor=Blonde&clotheType=ShirtVNeck&clotheColor=PastelRed&eyeType=Squint&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Brown'
    },
    cart: {
        type: [String], 
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
});

// Create a geospatial index to allow searching "Farms near me" in the future
userSchema.index({ 'farms.location': '2dsphere' });

const User = mongoose.model('User', userSchema);

export default User;