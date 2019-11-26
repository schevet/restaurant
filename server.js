// Dependencies
// =============================================================
var express = require("express");
// var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up a static folder for client files that ignores the routes
app.use(express.static('public'))


let reservations = [];

app.get("/api/reservations", function (req, res){
return res.json(reservations)
})
// Create New Reservations - takes in JSON input
app.post("/api/reservations", function (req, res) {

  console.log("post")
  var newReservation = req.body;

  reservations.push(newReservation);
  res.json(newReservation)
})


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});