console.log("test");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
let ejs = require("ejs");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("static"));

app.get("/", (req, res) => res.render("../views/pages/index.ejs"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
