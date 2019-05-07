console.log("test");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
let ejs = require("ejs");

require("dotenv").config();

app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
