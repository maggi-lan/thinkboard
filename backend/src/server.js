
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Load .env file
dotenv.config();

// Create an express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());             // enable JSON body parsing
app.use(cors({                       // allows frontend to access this API
    origin: "http://localhost:5173",
}));
app.use(rateLimiter);                // adds a rate limiter
app.use("/api/notes", notesRoutes);  // mounts the notes API routes

// Connect to MongoDB database
connectDB().then(() => {
    // Listen for requests
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
});
