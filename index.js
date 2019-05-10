console.log("test");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
let ejs = require("ejs");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var request = require("request");

var bodyParser = require("body-parser");
app.use(bodyParser());

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("static"));

var bedrijven = [
  {
    bedrijfsnaam: "Dept",
    coordinaten: "52.34472,4.84659",
    fietsenplan: true,
    travelDistance: 12,
    travelDuration: 13
  },
  {
    bedrijfsnaam: "Elastique",
    coordinaten: "52.22962,5.18671",
    fietsenplan: true,
    travelDistance: 32,
    travelDuration: 30
  },
  {
    bedrijfsnaam: "Valtech",
    coordinaten: "52.33355,4.9213",
    fietsenplan: true,
    travelDistance: 3,
    travelDuration: 8
  },
  {
    bedrijfsnaam: "Mirabeau",
    coordinaten: "52.33389,4.92159",
    fietsenplan: true,
    travelDistance: 3,
    travelDuration: 8
  }
];

// app.get("/", (req, res) => res.render("../views/pages/index.ejs"));
app.get("/", (req, res, next) => {
  res.render("../views/pages/index.ejs", {
    // data: data.resourceSets[0].resources[0].results,
    bedrijven: bedrijven
  });
  //res.render("../views/pages/test.ejs");
  // var urls = [];
  //
  // bedrijven.forEach(function(bedrijf) {
  //   console.log(bedrijf.coordinaten);
  //
  //   var params = {
  //     thuis: "52.35898,4.90921", //wibautstraat 1091gc start
  //     bestemming: bedrijf.coordinaten
  //   };
  //   var url = {
  //     origins: params.thuis + ";" + params.bestemming
  //   };
  //
  //   var completeUrl =
  //     "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" +
  //     url.origins +
  //     "&destinations" +
  //     url.origins +
  //     "&travelMode=driving&key=Avrt4pvjbZmxYTw-gmKzdZjwrGyqeyWuarn3n2w2HYgvlatgflfAgaqKtpqst43o";
  //   console.log(completeUrl);
  //   urls.push(completeUrl);
  //   console.log(urls);
  // });
  //
  // var options = {
  //   url: urls[2],
  //   headers: {
  //     "Content-Type": "application/json"
  //     // "Ocp-Apim-Subscription-Key": "a25da04c7ab94cf1bf6a3663aa4fb712"
  //   }
  // };
  //
  // function callback(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var data = JSON.parse(response.body);
  //     console.log(data.resourceSets[0].resources[0].results);
  //     res.render("../views/pages/test.ejs", {
  //       data: data.resourceSets[0].resources[0].results,
  //       bedrijven: bedrijven
  //     });
  //   } else {
  //     console.log(error);
  //   }
  // }
  // request(options, callback);
});
app.post("/test/:baseUrl", function(req, res) {
  var response = req.params.baseUrl;
  console.log(response);

  var response = "vervoersmiddel=&fiets&auto+reistijd=&15&45";
  var vervoersmiddel = response.split("+");
  console.log(vervoersmiddel);

  io.emit("chat message", "verstuurd");
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
    io.emit("formanswer", "antwoord van formulier");
    console.log("msg form", "verstuurd");
  });
});

// io.on("connection", function(socket) {
//   socket.on("formanswer", function(msg) {
//     io.emit("formanswer", "antwoord van formulier");
//     console.log("formanswer", "antwoord van formulier");
//   });
// });

http.listen(3000, function() {
  console.log("listening on *:3000");
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
