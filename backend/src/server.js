
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Load .env file
dotenv.config();

// Create an express app
const app = express();
const PORT = process.env.PORT || 5001;

// Fetch current directory
const __dirname = path.resolve();




// MIDDLEWARES

// Enable JSON body parsing
app.use(express.json());

// Allows frontend to access this API during development
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

// Add a rate limiter
app.use(rateLimiter);

// Mount the notes API routes
app.use("/api/notes", notesRoutes);

// Serve the frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {  // serve the react app for any route not matching notesRoutes
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}




// Connect to MongoDB database
connectDB().then(() => {
    // Listen for requests
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
});
