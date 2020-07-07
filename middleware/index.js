let Campground = require("../models/campground");
let Comment = require("../models/comment");

let middlewareObj = {}; /* EMPTY OBJECT IN WHICH WE ADD THE MIDDLEWARE FUNCTION */

// isLoggedIn FUNCTION THAT IS A MIDDLEWARE WHICH CHECK THE USER IS LOGGIN OR NOT
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","Please login first!!");
    res.redirect("/login");
};


//  MIDDLEWARE THAT CHECK THE
// 1. THE USER IS LOGGED IN
// 2. THE CURRENT USER OWNS THE CAMPGROUND
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) { /* MEANS THE USER IS LOGGED IN */
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                req.flash("error","Something Went Wrong");
                console.log(err);
                res.redirect("/campgrounds");
            }
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next(); /* IT MEANS WE FOUND THE CURRENT USER IS THE OWNER OF THIS CAMPGROUND AND NOW CURRENT USER CAN EDIT, UPDATE AND DELETE THIS */
                }
                else {
                    req.flash("error","You dont't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error","You must be LoggedIn.");
        res.redirect("/login");
    }
};


//  MIDDLEWARE THAT CHECK THE
// 1. THE USER IS LOGGED IN
// 2. THE CURRENT USER OWNS THE COMMENT

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            console.log(req.params.comment_id);
            console.log(foundComment);
            if (err) {
                req.flash("error","Something Went Wrong");
                console.log(err);
            }
            else {
                // DOES CURRENT USER OWNS THIS COMMENT
               // console.log(foundComment.author.id);
               // console.log(req.user._id);
                if (foundComment.author.id.equals(req.user._id)) { /* IT MEANS WE FOUND THE CURRENT USER IS THE OWNER OF THIS COMMENT AND NOW CURRENT USER CAN EDIT, UPDATE AND DELETE THIS */
                    next();
                }
                else {
                    req.flash("error","You dont't have permission to do that"); 
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error","You must be LoggedIn.");
        res.redirect("/login");
    }
};


module.exports = middlewareObj;


