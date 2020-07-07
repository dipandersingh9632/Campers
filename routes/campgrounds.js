let express = require('express');
let router = express.Router();
let Campground = require('../models/campground');
let middleware = require("../middleware"); /* IT WILL AUTOMATICALLY  ADD  THE index.js FILE */

//getRoute  INDEX ROUTE
//app.get("/campgrounds", function (req, res) {
router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampground) { /* {} MEANS ALL THE CONTENT OF Campground DATABASE */
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            res.render("campgrounds/index.ejs", { campgroundsArray: allCampground });
            /* THIS allCampground CONTAINS ALL THE CAMPGROUND THAT WE ADD THROUGH POST ROUTE NOW IT WILL GIVE ALL THE VALUES TO campgroundArray WHICH WILL SHOW IN THE "campgrounds.ejs"*/
        }
    });
});


//getRoute for new    NEW ROUTE
//app.get("/campgrounds/new", function (req, res) {
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new.ejs");
});

//postRoute  CREATE ROUTE
//app.post("/campgrounds", function (req, res) {
router.post("/", middleware.isLoggedIn, function (req, res) {
    /*HERE WE ADD THE FORM VALUES TO THE campARRAY */
    let name = req.body.name; /*IT WILL GIVE  THE name THAT WE USED IN FORM <input> */
    let imageurl = req.body.image; /*IT WILL GIVE  THE image THAT WE USED IN FORM <input> */
    let desc = req.body.description; /* IT WILL GIVE THE description THAT WE USED IN FORM <input> */
    let price = req.body.price;  /* IT WILL GIVE THE price THAT WE USED IN FORM <input> */
    let author = { /* IT WILL ADD THE username AND id OF THAT USER */
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = { name: name, image: imageurl, description: desc, price: price, author: author };
    // ADD THE newCAMPGROUND TO THE DATABASE
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            // console.log(newlyCreated);
            // WE REDIRECT THE PAGE TO "/campgrounds"
            req.flash("success", "Successfully Created Campground!!");
            res.redirect("/campgrounds");
        }
    });
});

//SHOW ROUTE
//app.get("/campgrounds/:id", function (req, res) {
router.get("/:id", function (req, res) {
    //TO FIND THE CAMPGROUND WITH PROVIDED ID THAT WE CAN GET BY req.params.id
    Campground.findById(req.params.id).populate("comments").exec(function (err, campgroundDetail) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            // RENDER THE SHOW PAGE WITH THE PROVIDED ID
            // console.log(req.params.id);
            // console.log(campgroundDetail);
            res.render("campgrounds/show.ejs", { campgroundDetail: campgroundDetail });
        }
    });
});

//EDIT ROUTE WHICH UPDATE THE PARTICULAR CAMPGROUND
//router.get("/campgrounds:/id/edit",function(req,res){
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            res.render("campgrounds/edit.ejs", { CampgroundDetail: foundCampground });
        }
    })

});

// PUT ROUTE WHICH WILL UPDATE THE EDIT FORM DETAILS AND THEN REDIRECT TO SHOW ROUTE
//router.put("/campgrounds/:id",function(req,res){
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    // Find and Update the Campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updateCampground) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            res.redirect("/campgrounds/" + req.params.id); /* ("/campgrounds/id") WHICH WE CAN CONCATENATE BY +req.params.id */
        }
    });
});

// DELETE ROUTE WHICH DELETE THE PARTICULAR CAMPGROUND
//router.delete("/campgrounds/:id",function(req,res){
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            req.flash("success", "Successfully Deleted Campground");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;