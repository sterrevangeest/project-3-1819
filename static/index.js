$(function() {
  var socket = io();

  $(".specialMessage").submit(function(e) {
    console.log("special Message versturen");
    e.preventDefault(); // prevents page reloading
    socket.emit("form", $("#input-message").val());
    $("#input-message").val("");
    return false;
  });

  socket.on("form", function(msg) {
    $("#messages").append(
      $(`<li class="formchat"><form class="specialMessageAntwoord" action="#" method="post" onsubmit= submitForm();>
      <div class="q">
          <label for="transport">Vervoersmiddel
              <div class="options" id="transport">
              <input name="transport" type="checkbox" id="fiets" value="fiets">
              <label for="fiets">Fiets</label>
              <input type="checkbox" name="transport" id="auto" value="auto">
              <label for="auto">Auto</label>
              <input type="checkbox" name="transport" id="ov" value="ov">
              <label for="ov">OV</label>
              <input type="checkbox" name="transport" id="lopend" value="lopend">
              <label for="lopend">Lopend</label>

              </div>
          </label>
      </div>
      <div class="q">
          <label for="traveltime"> Reistijd
              <div class="options" id="traveltime">
              <input  name="traveltime" type="checkbox" id="vijftien" value="-15">
              <label for="vijftien">-15 min</label>
              <input  name="traveltime" type="checkbox" id="vijfenveertig" value="15-45">
              <label for="vijfenveertig">15 tot 45 min</label>
              <input  name="traveltime" type="checkbox" id="zestig" value="45-60">
              <label for="zestig">45 - 60 min</label>
              <input  name="traveltime" type="checkbox" id="zestigplus" value="60+">
              <label for="zestigplus">60+ min</label>
              </div>
          </label>
      </div>
            <button class="chatbutton" type="submit" name="button">Versturen</button>
        </form></li>`)
    );
  });

  ///

  $(".chat").submit(function(e) {
    console.log(e.originalEvent.target.classList[0]);
    if (e.originalEvent.target.classList[0] === "specialMessageAntwoord") {
      console.log("antwoord");
      e.preventDefault();
    } else {
      console.log("gewoon bericht versturen");
      e.preventDefault(); // prevents page reloading
      socket.emit("chat message", $("#input-message").val());
      $("#input-message").val("");
      return false;
    }
  });

  socket.on("chat message", function(msg) {
    $("#messages").append($("<li>").text(msg));
  });

  ///

  // $(".specialMessageAntwoord").submit(function(e) {
  //   console.log("special Message beantwoorden");
  //   console.log(e);
  //   var data = {
  //     test2: $("#inputtest2").val() || "anon"
  //   };
  //   console.log(data);
  //
  //   e.preventDefault(); // prevents page reloading
  //   socket.emit("formanswer", $("input").val());
  //   $("input").val("");
  //   return false;
  // });
  //
  // socket.on("formanswer", function() {
  //   $("#messages").append($("<li>").text("done"));
  // });
});

function submitForm() {
  var transportIds = ["fiets", "auto", "ov", "lopend"];
  var traveltimeIds = ["vijftien", "vijfenveertig", "zestig", "zestigplus"];

  var transport = transportIds.filter(function(num) {
    var check = document.getElementById(num).checked;
    console.log(check);
    if (check === true) {
      console.log(num);
      return num;
    }
  });

  var traveltime = traveltimeIds.filter(function(num) {
    var check = document.getElementById(num).checked;
    console.log(check);
    if (check === true) {
      console.log(num);
      return num;
    }
  });

  var param1 = "vervoersmiddel=";
  var param2 = "+reistijd=";
  var intermediarForm = document.querySelector(".intermediarForm");
  transport.forEach(function(id) {
    param1 += "&" + id;

    intermediarForm.querySelector("#" + id).checked = true;
  });

  traveltime.forEach(function(id) {
    param2 += "&" + id;

    console.log(id);

    intermediarForm.querySelector("#" + id).checked = true;

    console.log(intermediarForm.querySelector("#" + id).value);
    var value = parseInt(intermediarForm.querySelector("#" + id).value);
    console.log(value);

    var bedrijvenlist = document.querySelector(".bedrijven");

    var bedrijflist = bedrijvenlist.querySelectorAll("li");
    console.log(bedrijflist);
    bedrijflist.forEach(function(bedrijf) {
      var compagnyValue = parseInt(bedrijf.value);
      console.log(compagnyValue, value);
      if (compagnyValue < value) {
        console.log("li");
        console.log(bedrijf);
        bedrijf.classList.toggle("green");
      } else {
        bedrijf.classList.toggle("red");
      }
    });
  });

  // var intermediarForm = document.querySelector(".intermediarForm");
  // console.log(intermediarForm);
  //
  // var test = (intermediarForm.querySelector("#fiets").checked = true);
  // console.log(test);

  var http = new XMLHttpRequest();

  http.open("POST", "/test/" + param1 + param2, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.send();
}
