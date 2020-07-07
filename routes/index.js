let express = require('express');
let router = express.Router();
let passport = require('passport');
let User = require("../models/user");

// LANDING Routesssssssss  
router.get("/", function (req, res) {
    res.render("landing.ejs");
});


//================================
// Auth Routessss
//================================

//SHOW REGISTER FORM  WHEN USER CLICKS ON SignUp IN NAVIGATION BAR
router.get("/register", function (req, res) {
    res.render("register.ejs");
})

// POST ROUTE WHICH HANDLE THE REGISTER FORM
router.post("/register", function (req, res) {
    newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register.ejs"); /* IT WILL SHOW THE ERROR MESSAGE AND RENDER THE REGISTER FORM i.e. register.ejs */
        }
        else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success","Welcome to Campers "+user.username); /*IT WIL SHOW THE SUCCESS MESSAGE WITH THE SIGNUP username */
                res.redirect("/campgrounds");
            });
        }
    });
});

// SHOW LOGIN FORM WHEN THE USER CLICKS ON login IN NAVIGATION BAR
//LOGIN FORM ROUTE
router.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("error") });
});

//POST ROUTE TO HANDLE THE LOGIN FORM
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
});

//LOGOUT ROUTE WHICH SIMPLY LOGOUT THE USER
router.get("/logout", function (req, res) {
    req.logOut();
    req.flash("success", "Successfully Logged you Out");
    res.redirect("/campgrounds");
});

//================================
// END OF Auth Routessss
//================================

module.exports = router;


