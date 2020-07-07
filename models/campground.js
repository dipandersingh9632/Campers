//MONGOOSE SETUP
let mongoose = require('mongoose');

//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
//COLLECTIONS OR THE YOU CAN SAY THE VARIABLE BY WHICH WE ACCESS THE DATABASE
let Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;
