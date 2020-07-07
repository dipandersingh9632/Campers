let express = require('express');
let router = express.Router({ mergeParams: true });
let Campground = require("../models/campground");
let Comment = require("../models/comment");
let middleware = require("../middleware"); /* IT WILL AUTOMATICALLY  ADD  THE index.js FILE */

/* ================
 COMMENTS NEW ROUTE
  =================  */
// router.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            res.render("comments/new.ejs", { campground: campground });
        }
    });
});

//POST ROUTE FOR COMMENTS
// router.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log("ERROR FOUND");
                    console.log(err);
                }
                else {
                    //ADD username AND id TO Comment
                    // Comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    //SAVE Comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success","Successfully Added Comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT ROUTE WHICH RENDER A EDIT FORM
//router.get("/campgrrounds/:id:/comments/:comment_id/edit",function(req,res{
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            res.render("comments/edit.ejs", { campgroundID: req.params.id, comment: foundComment });
        }
    });
});

// UPDATE ROUTE OR PUT ROUTE WHICH UPDATE THE COMMENT WITH THE FORM VALUE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updateComment) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            res.redirect("/campgrounds/" + req.params.id); /* REDIRECT TO THE /campgrounds/:id WHICH IS SHOW ROUTE */
        }
    });
});

// DETROY ROUTE WHICH DELETE THE COMMENT
//router.delete("/campgrounds/:id/comments/:comment_id",function(req,res){ 
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndDelete(req.params.comment_id, function (err) {
        if (err) {
            console.log("ERROR FOUND");
            console.log(err);
        }
        else {
            req.flash("success","Successfully Deleted Comment");
            res.redirect("/campgrounds/" + req.params.id); /* REDIRECT TO THE SHOW ROUTE */
        }
    });
});

module.exports = router;
