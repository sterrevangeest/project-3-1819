console.log("test");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
let ejs = require("ejs");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
app.use(bodyParser());

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("static"));

app.get("/", (req, res) => res.render("../views/pages/index.ejs"));
app.get("/test", (req, res) => res.render("../views/pages/test.ejs"));

// app.post("/specialMessages", (req, res) => console.log("antwoord", req.params));
// app.post("/specialMessages", function(req, res) {
//   console.log("hoi");
// });

app.post("/antwoord", function(req, res) {
  console.log(req.body);
  var msg = "antwoord is: ik wil met de fiets";
  var msg =
    "vervoersmiddel: " +
    req.body.transport +
    ", reistijd: " +
    req.body.traveltime;
  console.log(msg);
  // io.on("connection", function(socket) {
  //   socket.on("form", function(msg) {
  io.emit("chat message", "verstuurd");
  //     console.log("msg form", "msg");
  //   });
  // });

  res.write("step 1 done");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
    console.log("msg", msg);
  });
  // socket.on("form", function(msg) {
  //   io.emit("form", msg);
  //   console.log("msg form", msg);
  // });
});

io.on("connection", function(socket) {
  socket.on("form", function(msg) {
    io.emit("form", "verstuurd");
    console.log("msg form", "verstuurd");
  });
});

// io.on("connection", function(socket) {
//   socket.on("formanswer", function(msg) {
//     io.emit("formanswer", msg);
//     console.log("formanswer", msg);
//   });
// });

http.listen(3000, function() {
  console.log("listening on *:3000");
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
