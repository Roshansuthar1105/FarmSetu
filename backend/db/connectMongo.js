import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectToMongoDb= async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Connected to database`);
    }
    catch(err){
        console.log(`Error connecting to db: ${err}`);
        process.exit(1);
    }
}
export default connectToMongoDb;