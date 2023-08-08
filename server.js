const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", async (req, res) => {
  const data = await fs.readFile("./db/db.json", { encoding: "utf-8" });
  const jsonData = JSON.parse(data);
  res.json(jsonData);
  console.log(jsonData);
});

app.post("/api/notes", async (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    let noteData = await fs.readFile("./db/db.json", { encoding: "utf-8" });
    let jsonNote = JSON.parse(noteData);

    const newNoteData = [...jsonNote, newNote];

    const noteString = JSON.stringify(newNoteData, undefined, 4);

    await fs.writeFile(`./db/db.json`, noteString, (err) =>
      err ? console.error(err) : console.log(`Note Saved ${newNote.title}`),
    );
    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
