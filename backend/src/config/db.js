
import mongoose from "mongoose";

// Connect to the MongoDB database asynchronously
export const connectDB = async () => {
    try {
        // Retrieve the database URI from the environment variables
        const MONGO_URI = process.env.MONGO_URI

        // Create a connection to the database
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);  // exit with failure
    }
}
