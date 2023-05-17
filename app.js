const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const alert = require("alert");
 
const app = express();

// Set up the Express app
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const userSchema = {
    email: String,
    password: String
};
const User = new mongoose.model("User", userSchema);

// Define the news schema and model
const newsSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});
const News = mongoose.model('News', newsSchema);

const eventsSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true
  },
  eventdate: {
    type: Date,
    required: true
  },
  eventlocation: {
    type: String,
    required: true
  },
  eventdescription: {
    type: String,
    required: true
  }
});
const Events = mongoose.model('Events', eventsSchema);

// Render the home page
app.get('/', (req, res) => {
  News.find().sort('-date').exec((err, news) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.render('home', { news });
    }
  });
});

// Render the admin portal
app.get('/addNews', (req, res) => {
  res.render('addNews');
});

// Handle the submission of news data
app.post('/addNews', (req, res) => {
  const { subject, description, date } = req.body;

  if (!subject || !description || !date) {
    return res.status(400).send('Subject, description, and date are required');
  }

  const news = new News({
    subject,
    description,
    date
  });

  news.save((err, news) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send('News added successfully');
    }
  });
});

app.post('/addEvent', (req, res) => {
  const { eventname, eventdate, eventlocation, eventdescription } = req.body;

  if (!eventname || !eventdate || !eventlocation || !eventdescription) {
    return res.status(400).send('All fields are required');
  }

  const events = new Events({
    eventname,
    eventdate,
    eventlocation,
    eventdescription
  });

  events.save((err, events) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.send('Event added successfully');
    }
  });
});
 
 
// app.get("/", function (req, res) {
//   res.render('home');
// });
 
app.get("/login", function(req, res) {
  res.render("login");
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