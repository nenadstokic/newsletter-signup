// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// ff5527efa08eda1758d6f080ee23a657-us19   api key
// 71bcb56172  list id

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  var data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
      url: "https://us19.api.mailchimp.com/3.0/lists/71bcb56172",
      method: "POST",
      headers: {
        "Authorization" : "Nenad ff5527efa08eda1758d6f080ee23a657-us19"
      },
      body: jsonData,

  };

  request(options, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });

});

app.listen(3000, function(){
  console.log("server is running on port 3000.");
});
