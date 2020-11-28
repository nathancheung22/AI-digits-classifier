const express = require("express");
const path = require("path");
const cors = require("cors");
const modelJSON = require("./src/config/model.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/static", express.static("src/config"));
app.use(express.static(path.join(__dirname, "build")));

// sends tf.js model files
app.get("/model", (req, res) => res.json(modelJSON));
app.get("/group1-shard1of1.bin", (req, res) => res.download("./src/config/group1-shard1of1.bin"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")));

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
