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
    res.json(note);
});

app.post("/notes",(req,res) => {
    const newNote=req.body;

    const data = fs.readFileSync("notes.json");
    const notes = JSON.parse(data);
    newNote.id=Date.now();
    notes.push(newNote);
    fs.writeFileSync("notes.json", JSON.stringify(notes,null,2));
    res.status(201).json({message: "Note added successfully!"});
});

app.delete("/notes/:id",(req,res)=>{
    const noteId= parseInt(req.params.id);

    const data = fs.readFileSync("notes.json");
    const notes=JSON.parse(data);

    const filteredNotes = notes.filter(n => n.id !== noteId);

    if (notes.length === filteredNotes.length) {
        return res.status(404).json({ message: "Note not found" });
    }

    fs.writeFileSync("notes.json",JSON.stringify(filteredNotes, null, 2));

    res.json({ message: "Note deleted successfully" });

});

app.put("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    const updatedData = req.body;

    const data = fs.readFileSync("notes.json");
    const notes = JSON.parse(data);

    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
        return res.status(404).json({ message: "Note not found" });
    }

    // Keep old ID
    notes[noteIndex] = {
        ...notes[noteIndex],
        title: updatedData.title,
        content: updatedData.content
    };

    fs.writeFileSync(
        "notes.json",
        JSON.stringify(notes, null, 2)
    );

    res.json(notes[noteIndex]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});