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


function cards(res, tableNumber) {
  block = `                   
  <div class="card">
      <div class="card-body">
          <h2 class = "table">Table No. ${tableNumber}</h2>
          <hr>
          <h3 class= "name">Name: ${res.name}</h2>
          <h3 class = "phone">Phone Number:${res.phone}</h3>
          <h3 class = "email">Email: ${res.email}</h3>
          <h3 class = "uniqueID">ID: ${res.id}</h3>
      </div>
  </div>`
  return block;
}

function cardWait(res, tableNumber) {
  block = `                   
  <div class="card">
      <div class="card-body">
          <h2 class = "table">Place in line: ${tableNumber}</h2>
          <hr>
          <h3 class= "name">Name: ${res.name}</h2>
          <h3 class = "phone">Phone Number:${res.phone}</h3>
          <h3 class = "email">Email: ${res.email}</h3>
          <h3 class = "uniqueID">ID: ${res.id}</h3>
      </div>
  </div>`
  return block;
}

function createHTML(res, otherlist) {
  
  block = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <title>View Tables</title>
      <!-- Latest compiled and minified CSS & JS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <script src="https://code.jquery.com/jquery.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  
  </head>
  
  <body>
  
      <div class="container">
          <div class="jumbotron text-center">
              <h1>James's Soul Kitchen</h1>
              <hr>
              <h3>View Tables</h3>
  
              <div class="text-center">
                  <a href="reserve.html"><button class="btn btn-lg btn-danger"><span class="fa fa-check"></span> Make
                          Reservation</button></a>
                  <a href="index.html"><button class="btn btn-lg btn-default"><span
                              class="fa fa-home"></span></button></a>
              </div>
          </div>
          <div class="row">
  
              <div class="col-12">
  
                  <div class="card mb-4">
                      <div class="card-header">
                          <h3><strong>Current Reservations</strong></h3>
                      <div class="card-body">
                      ${res}
                  </div>
              </div>
          </div>
  
          <div class="row">
  
              <div class="col-12">
  
                  <div class="card mb-4">
                      <div class="card-header">
                          <h3><strong>Waiting List</strong></h3>
                      </div>
                      <div class="card-body">
                      ${otherlist}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  
      <script src="js/search.js"></script>
  </body>
  
  </html>`
  return block

}


var currentTables = [];
var waitList = [];


// Create New Reservations - takes in JSON input
app.post("/api/reservations", function (req, res) {

  console.log("post")
  var newReservation = req.body;
  let rescards = ""
  let waitListCards = "";
 
//  Checks if to see if any tables are open and if its not writes user info to wait list
  if (currentTables.length <= 4) {

    currentTables.push(newReservation)

    console.log("res")
  } else {

    waitList.push(newReservation)

    // Writes the objects in the waiting list to HTML 
    for (i = 0; i < waitList.length; i++) {
      const f = cardWait(waitList[i], i+1);
      waitListCards = waitListCards + f
    }
    
  }

  // Writes the occupied tables information to html 
  for (z = 0; currentTables.length > z; z++) {
    const e = cards(currentTables[z], z+1);
    rescards =   rescards + e

  }


//  Sends both html strings to a new html
  const write = createHTML(rescards, waitListCards)
  fs.writeFile("./public/view.html", write, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("printed")
    }

    // res.json(newReservation);
  })
})


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
