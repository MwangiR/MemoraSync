const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const uuid = require("uniqid");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
//parse incoming URL-encoded form data. It adds a new body object to the request object containing the parsed form data
app.use(express.urlencoded({ extended: true }));
// serves static files, such as HTML, CSS, JavaScript, images, and other assets
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// This code will send the notes.html file to the client when the client requests the /notes path.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//an api route that will get the notes from the db.json and then display them in json format.
app.get("/api/notes", async (req, res) => {
  //reads the contents of the file db.json into a string variable named data.
  const data = await fs.readFile("./db/db.json", { encoding: "utf-8" });

  // Parses the JSON data into a JavaScript object
  const jsonData = JSON.parse(data);
  res.json(jsonData);
  console.log(jsonData);
});

app.post("/api/notes", async (req, res) => {
  // takes the title and text from a request object and saves it to the database.
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid.process(),
    };

    // This code reads the notes from the db.json file and parses them into a JSON object.
    // The parsed JSON object is returned.
    let noteData = await fs.readFile("./db/db.json", { encoding: "utf-8" });
    let jsonNote = JSON.parse(noteData);

    // This code adds the new note to the existing list of notes
    // in the jsonNote array. First, it creates a new array
    // called newNoteData that contains the existing array plus
    // the new note. Then it sets the jsonNote variable to the
    // new array.
    const newNoteData = [...jsonNote, newNote];

    const noteString = JSON.stringify(newNoteData, undefined, 4);

    // writes the notes to the db.json file. It uses fs.writeFile to write it to the file. It also uses a promise to handle any errors that may occur.

    await fs.writeFile(`./db/db.json`, noteString, (err) =>
      err ? console.error(err) : console.log(`Note Saved ${newNote.title}`),
    );

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.json(newNoteData);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE endpoint to delete a note by ID
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  // Log the ID to console
  console.info(id);
  // Read the existing note data from the JSON file
  const noteData = await fs.readFile("./db/db.json", { encoding: "utf-8" });
  const jsonNote = JSON.parse(noteData);
  // Filter the jsonNote array to remove the note with the specified id
  const newNoteData = jsonNote.filter((note) => note.id !== id);
  // Write the filtered notes to the db.json file
  const noteString = JSON.stringify(newNoteData, undefined, 4);
  // Write the updated note data back to the JSON file
  await fs.writeFile(`./db/db.json`, noteString, (err) =>
    err ? console.error(err) : console.log(`Note Deleted ${id}`),
  );
  res.json(newNoteData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
