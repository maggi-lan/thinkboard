
import Note from "../models/Note.js";

// Fetch all the notes in the database and returns it as a JSON
export async function getAllNotes(_, res) {
    try {
        // Fetch all documents in 'notes' collection and sort them
        let notes = await Note.find().sort({
            createdAt: -1  // most recently created documents come first
        });

        // Send JSON response
        res.status(200).json(notes);
    }

    // Send error response
    catch (error) {
        console.log(`Error in getAllNotes controller: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Add a new note to the collection and return it as a JSON
export async function createNote(req, res) {
    try {
        // Extract title & content from the request body
        const { title, content } = req.body;

        // Instantiate a new Note document
        const note = new Note({
            title: title,
            content: content
        });

        // Write the document to the database
        const savedNote = await note.save();

        // Send JSON response
        res.status(201).json(savedNote);
    }

    // Send error response
    catch(error) {
        console.log(`Error in createNote controller: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Update an existing note and return the updated note as a JSON
export async function updateNote(req, res) {
    try {
        // Extract title & content from the request body
        const { title, content } = req.body;

        // Fetch a document by its ID and update it
        // NOTE: 'req.params.id' is the query parameter called 'id'
        // NOTE: { new: true } returns the document after the update 
        // NOTE: { new: false } returns the document before the update -> default behaviour
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
            {
                title: title,
                content: content
            },
            {
                new: true
            }
        );

        // Return a 404 response if invalid ID is queried
        if (!updatedNote)
            return res.status(404).json({
                message: "Note not found"
            });

        // Send JSON response
        res.status(200).json(updatedNote);
    }

    // Send error response
    catch (error) {
        console.log(`Error in updateNote controller: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Delete an existing note and return the deleted note as a JSON
export async function deleteNote(req, res) {
    try {
        // Fetch a document by its ID and delete it
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        // Return a 404 response if invalid ID is queried
        if (!deletedNote)
            return res.status(404).json({
                message: "Note not found"
            });

        // Send JSON response
        res.status(200).json(deletedNote);
    }

    // Send error response
    catch (error) {
        console.log(`Error in deleteNote controller: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Fetch an existing note and return it as a JSON
export async function getNoteById(req, res) {
    try {
        // Fetch a document by its ID
        const note = await Note.findById(req.params.id);

        // Return a 404 response if invalid ID is queried
        if (!note)
            return res.status(404).json({
                message: "Note not found"
            });

        // Send JSON response
        res.status(200).json(note);
    }

    // Send error response
    catch (error) {
        console.log(`Error in deleteNote controller: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
