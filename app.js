//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extednded: true
}));


app.use(express.static("public"))


app.post("/failure", function(req, res){
  res.redirect("/");
})

app.post("/success", function(req, res){
  res.redirect("/");
})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
      FNAME: firstName,
      LNAME: lastName
      }
    }]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/87765cfe22"

  const options = {
    method: "POST",
    auth: "kaixuan1:c9c9de29c26744a9f713caa052267bfe-us20"
  }

  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
})


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
})

//API KEY:
//c9c9de29c26744a9f713caa052267bfe-us20

//list id:87765cfe22
