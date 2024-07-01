const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// const { safeStringify } = require('request/lib/helpers');
const https = require("https");
const { constrainedMemory } = require("process");
const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  try {
    const firstname = req.body.Fname;
    const lastname = req.body.Lname;
    const emailenter = req.body.email;
    console.log(firstname, lastname, emailenter, "");

    const data = {
      members: [
        {
          email_address: emailenter,
          status: "subscribed",
          merge_fields: {
            FNAME: firstname,
            LNAME: lastname,
          },
        },
      ],
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/344030c253";
    const options = {
      method: "POST",
      auth: "osamaMail:2fa922d4c853d9c96de0f74358dd9c41-us17",
    };
    const request = https.request(url, options, function (response) {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html");
      } else res.sendFile(__dirname + "/failure.html");
      response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
    });

   // request.write(jsonData);
    request.end();
  } catch (error) {
    console.log(error);
  }
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});
app.listen(8002, (req, res) => {
  console.log("listening on port 8002");
});

//Api key 2fa922d4c853d9c96de0f74358dd9c41-us17
//Audience 344030c253
