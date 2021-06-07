const express = require("express");
const cors = require("cors");
const port = 5000;
const app = express();

const db = require("../firebase.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send('<h1>Test</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
