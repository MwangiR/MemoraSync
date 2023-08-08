const express = require("express");
const fs = require("fs/promises");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const jsonData = res.json(JSON.parse(data));
    console.log(jsonData);
  });
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

module.exports = app;
