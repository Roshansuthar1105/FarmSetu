import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Removes whitespace from both ends of the string
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Email must be unique
        trim: true,
        lowercase: true, // Converts email to lowercase
    },
    password: {
        type: String,
        required: true, // Password is required
        minlength: 6, // Password must be at least 6 characters long
    },
    role: {
        type: String,
        enum: ['farmer', 'seller', 'cooperative'],
        default: 'farmer',
    },
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current date and time
    },
    avatar:{
        type :String,
        required:true,
        default:'https://avataaars.io/?avatarStyle=Transparent&topType=Turban&accessoriesType=Round&hatColor=Blue01&facialHairType=BeardMajestic&facialHairColor=Blonde&clotheType=ShirtVNeck&clotheColor=PastelRed&eyeType=Squint&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Brown'
    },
    cart: {
        type: [String], // Array of MongoDB IDs of products
    },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
