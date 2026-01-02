
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Create an express app
const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB database
connectDB();

// Middleware
app.use(express.json());             // enable JSON body parsing
app.use("/api/notes", notesRoutes);  // mounts the notes API routes

// Listen for requests
app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
});
