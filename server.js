const express = require("express");

const app = express();

app.use(express.json());

const fs = require("fs");

app.get("/notes", (req, res) => {
    const data = fs.readFileSync("notes.json");
    const notes = JSON.parse(data);
    res.json(notes);
});

app.get("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);

    const data = fs.readFileSync("notes.json");
    const notes = JSON.parse(data);

    const note = notes.find(n => n.id === noteId);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});