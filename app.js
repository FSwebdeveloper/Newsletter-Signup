const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const Email = req.body.email;

const data = {
    members : [
        {
            email_address : Email,
            status : "subscribed",
            marge_fields : {
                FNAME : firstName,
                LNAME : lastName,
            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/4b30c9f242"

const options = {
    method : "post",
    auth: "achinta1:85fa0206a79f55a65d3f9acf127f3311-us14"
}

const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname +"/success.html");
    }else{
       res.sendFile(__dirname +"/failure.html");
    }
response.on("data", function(data){
console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();

});

app.post("/failure.html",function(req,res){
res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
 console.log("Server started on port on 3000");   
});