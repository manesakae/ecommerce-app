import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("DB connection failed", err);
        process.exit(1);
    }
}