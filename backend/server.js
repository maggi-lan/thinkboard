
import express from "express";

const app = express();
const port = 5001;

app.get("/api/notes", (req, res) => {
    res.status(200).send("You got 4 notes");
});

app.listen(port, () => {
    console.log(`Server running on PORT:${port}`);
});
