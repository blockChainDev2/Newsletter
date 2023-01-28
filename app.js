const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

const app = express();
const https = require("https");


app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
   console.log(req.body);
   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email = req.body.email;

   if(!firstName || !lastName || !email){
      res.redirect("html/failure.html");
      return;
   }

const data = {
   members: [
      {email_address: email,
       status: 'subscribed',
      merge_fields: {
         FNAME: firstName,
         LNAME: lastName
      }}
   ]
}


const postData = JSON.stringify(data);

   const options = {
      url: "https://us14.api.mailchimp.com/3.0/lists/0816b404ab",
      method: "POST",
      headers: {
         Authorization: "auth 3b4f25a0f30564ad269ddbc1cecf177a-us14"
      },
      body: postData
   }
   request(options, function(err, response, body){
     if(err) {
      res.redirect("html/failure.html");
     } else {
      if(response.statuscode === 200,201,202) {
         res.redirect("html/success.html");
      } else {
         res.redirect("html/failure.html");
      }
     }
   });
});

app.post("/failure", function(req,res){
   res.redirect("/");
})

 app.listen(process.env.PORT || 3000, function(){
    console.log("the server is running on port 3000");
 })
 //api key
 //3b4f25a0f30564ad269ddbc1cecf177a-us14

 //List Id
 //0816b404ab