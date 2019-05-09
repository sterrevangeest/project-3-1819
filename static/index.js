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
      $(`<form class="specialMessageAntwoord" action="antwoord" method="post">
      <div class="q">
          <label for="transport">Vervoersmiddel
              <div class="options">
                  <label for="fiets">Fiets</label>
                  <label for="auto">Auto</label>
                  <label for="ov">OV</label>
                  <label for="lopend">Lopend</label>
                  <input type="checkbox" name="transport" id="fiets" value="fiets">
                  <input type="checkbox" name="transport" id="auto" value="auto">
                  <input type="checkbox" name="transport" id="ov" value="ov">
                  <input type="checkbox" name="transport" id="lopend" value="lopend">
              </div>
          </label>
      </div>
      <div class="q">
          <label for="traveltime"> Reistijd
              <div class="options">
                  <label for="fiets">-15 min</label>
                  <label for="auto">15 tot 45 min</label>
                  <label for="ov">45 - 60 min</label>
                  <label for="lopend">60+ min</label>
                  <input class="test2" name="traveltime" type="checkbox" id="15" value="-15">
                  <input class="test2" name="traveltime" type="checkbox" id="45" value="15-45">
                  <input class="test2" name="traveltime" type="checkbox" id="60" value="45-60">
                  <input class="test2" name="traveltime" type="checkbox" id="60+" value="60+">
              </div>
          </label>
      </div>
            <button type="submit" name="button">submit</button>
        </form>`)
    );
  });

  ///

  $(".chat").submit(function(e) {
    console.log(e.originalEvent.target.classList[0]);
    if (e.originalEvent.target.classList[0] === "specialMessageAntwoord") {
      console.log("antwoord");
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
