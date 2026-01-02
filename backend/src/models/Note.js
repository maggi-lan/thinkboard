
import mongoose from "mongoose";

// Create schema first
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true  // gives createdAt and updatedAt fields
    }
);

// Create a model off that schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
