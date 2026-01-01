
import express from "express";

const app = express();
const port = 5001;

app.get("/api/notes", (req, res) => {
    res.status(200).send("You got 4 notes");
});

app.post("/api/notes", (req, res) => {
    res.status(201).json({
        "message": "Note created successfully!"
    });
});

app.put("/api/notes/:id", (req, res) => {
    res.status(200).json({
        "message": "Note updated succesfully!"
    });
});

app.delete("/api/notes/:id", (req, res) => {
    res.status(200).json({
        "message": "Note deleted succesfully!"
    });
});

app.listen(port, () => {
    console.log(`Server running on PORT:${port}`);
});
