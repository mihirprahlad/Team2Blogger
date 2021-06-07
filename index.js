const express = require("express");
const cors = require("cors");
const axios = require("axios");
const db = require("./firebase");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

