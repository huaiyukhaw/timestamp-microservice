
var moment = require("moment")
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// get current timestamp 
app.get("/api/timestamp", function (req, res) {
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  });
});

// get current timestamp 
app.get("/api/timestamp/:date_string", function (req, res) {
  const dateString = req.params.date_string
  var date = new Date(moment(dateString))
  var unixDate = ""
  var utcDate = ""
  
  if (isNaN(dateString)) {
    unixDate = date.getTime()
    utcDate = date.toUTCString()
  } else {
    unixDate = parseInt(dateString)
    utcDate = new Date(moment(parseInt(dateString))).toUTCString()
  }
  if (utcDate=="Invalid Date") {
    res.json({
      "error": utcDate
    })
  }
  
  res.json({
    "unix": unixDate,
    "utc": utcDate
  })
});
  

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});