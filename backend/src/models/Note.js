
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
// NOTE: 'notes' collection gets created automatically
// 'Note' is a representation of 'notes' collection
const Note = mongoose.model("Note", noteSchema);

// Export the Model object
export default Note;
