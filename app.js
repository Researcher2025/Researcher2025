const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const alert = require("alert");
 
const app = express();
 
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
 
mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser: true});
 
const userSchema = {
    email: String,
    password: String
};
 
const User = new mongoose.model("User", userSchema);
 
 
app.get("/", function (req, res) {
  res.render('home');
});
 
app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/addNews", function(req, res) {
  res.render("addNews");
});
 
app.get("/register", (req, res)=>{
  res.render("register");
});

app.get("/newsandupdates", (req,res)=> {
  res.render("newsandupdates");
})

app.get("/addEvent", (req,res)=> {
  res.render("addEvent");
})

app.get("/addjob", (req,res)=> {
  res.render("addjob");
})

app.get("/careerresources", (req,res)=> {
  res.render("careerresources");
})

app.get("/events", (req,res)=> {
  res.render("events");
})

app.get("/notablealumni", (req,res)=> {
  res.render("notablealumni");
})
 
app.post("/register", (req,res)=>{
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
 
    newUser.save()
    .then(function(){
        res.render("adminpage");
    })
    .catch(function(err){
        console.log(err);
    })
});
 
app.post("/login", function(req,res){
    const username = req.body.email;
    const password = req.body.password;
 
    User.findOne({email: username})
    .then(function(foundUser){
        if(foundUser.email==="admin@mmcoe.edu.in" && foundUser.password === password){
            res.render("adminpage")
        }
        else if(foundUser.password === password) {
          res.render("alumnipage")
        }
    })
    .catch(function(err){
        alert("Invalid details")
        res.redirect("/login")
        
    })
 
})
 
app.listen(1000, function () {
  console.log("Server started at port 1000");
});