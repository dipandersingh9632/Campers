//EXPRESS
let express = require('express');
let app = express();

//SEARCH FOR A main.css FILE 
app.use(express.static(__dirname + "/public"));

//BODY-PARSER
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE SETUP
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/campers_data_v00', { useNewUrlParser: true, useUnifiedTopology: true });

// *********************
// REUIRED THE ROUTES FILE
let campgroundRoutes = require("./routes/campgrounds");
let commentRoutes = require("./routes/comments");
let indexRoutes = require("./routes/index");
// *********************

//=======================================
//SEED FILE 
var seedDB = require('./seeds');

//METHOD OVERRIDE WHICH OVERRIDE THE METHOD "POST" TO "PUT"
let methodOverride = require('method-override');


// USER SCHEMA
User = require("./models/user");

//=====================
// FLASH SETUP
let flash = require("connect-flash");
app.use(flash());
//=====================

//CALLING seedDB() FUNCTION
//seedDB();
//==========================================


// TO USE METHODOVERRIDE
app.use(methodOverride("_method"));


//PASSPORT SETUP
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
app.use(require('express-session')({
    secret: "gg",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MIDDLEWARE FUNCTION THAT CHECK IF USER IS LOGGED IN THEN SHOW ONLY logout AND IF NOT THEN SHOW login AND SignUp
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
/* ALSO SEND TO EVERY TEMPLATE THE ERROR AND SUCCESS FLASH MESSAGE */
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// TO CALL TO USE THESE ROUTE
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


// SERVER 
app.listen(3000, function () {
    console.log("CAMPERS V12 SERVER IS BEEN STARTED");
});