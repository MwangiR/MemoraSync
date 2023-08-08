const express = require("express");
const fs = require("fs/promises");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", async (req, res) => {
  try {
    const data = await fs.readFile("./db/db.json", "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
    console.log(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/notes", async (req, res) => {
  const { text, title } = req.body;

  if (text && title) {
    const newNote = {
      title,
      text,
    };

    const noteData = await fs.readFile("./db/db.json", "utf8");
    const jsonNote = JSON.parse(noteData);

    jsonNote.push(newNote);

    const noteString = JSON.stringify(jsonNote);

    await fs.writeFile("./db/db.json", noteString, (errr) =>
      errr ? console.error(errr) : console.log("Note Updated"),
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

module.exports = app;
