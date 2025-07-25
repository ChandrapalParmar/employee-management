import mongoose from "mongoose";

const connectToDatabase=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,)
        console.log("Connected to MongoDB");
    } catch(err){
        console.error("MongoDB connection error:", err);
    }
}
export default connectToDatabase