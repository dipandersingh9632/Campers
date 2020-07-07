var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Manali", 
        image: "https://images.unsplash.com/photo-1587623265162-db952101e960?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Manali is a resort town nestled in the mountains of the Indian state of Himachal Pradesh near the northern end of the Kullu Valley in the Beas River Valley. It is located in the Kullu district, about 270 km (168 mi) north of the state capital, Shimla, 309 km (192 miles) north east of Chandigarh and 544 km (338 miles) northeast of Delhi, the national capital. The small town, with a population of 8,096,[1] is the beginning of an ancient trade route to Ladakh and from there over the Karakoram Pass on to Yarkand and Khotan in the Tarim Basin. It is a popular tourist destination and serves as the gateway to Lahaul and Spiti district as well as Leh. "
    },
    {
        name: "Ladakh", 
        image: "https://images.unsplash.com/photo-1475754358526-bad7b4b8eb05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
        description: "Ladakh is a region administered by India as a union territory, and constituting a part of the larger region of Kashmir, which has been the subject of dispute between India, Pakistan, and China since 1947.[8][9] It is bordered by the Chinese Tibet Autonomous Region to the east, the Indian state of Himachal Pradesh to the south, both the Indian state of Jammu and Kashmir and the Pakistan-administered Gilgit-Baltistan to the west, and the southwest corner of Xinjiang across the Karakoram Pass in the far north. It extends from the Siachen Glacier in the Karakoram range to the north to the main Great Himalayas to the south.[10][11] The eastern end of Ladakh, consisting of the uninhabited Aksai Chin plains, has been under Chinese control since 1962.[12][13] Until 2019, Ladakh was a region of the state of Jammu and Kashmir. In August 2019, the Parliament of India passed an act by which Ladakh became a union territory on 31 October 2019.[14] In the past Ladakh gained importance from its strategic location at the crossroads of important trade routes,[15] but since the Chinese authorities closed the borders with Tibet and Central Asia in the 1960s, international trade has dwindled except for tourism. Since 1974, the Government of India has successfully encouraged tourism in Ladakh. Since Ladakh is a part of the strategically important Kashmir region, the Indian military maintains a strong presence in the region. "
    },
    {
        name: "Shimla", 
        image: "https://images.unsplash.com/photo-1564760682062-1f9324bb7eec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Shimla also known as Simla, is the capital and the largest city of the Indian state of Himachal Pradesh. In 1864, Shimla was declared as the summer capital of British India, succeeding Murree, northeast of Rawalpindi. After independence, the city became the capital of Punjab and was later made the capital of Himachal Pradesh. It is the principal commercial, cultural and educational centre of the state. It was the capital city of British Burma (present-day Myanmar) from 1942 to 1945. Small hamlets were recorded prior to 1815 when British forces took control of the area. The climatic conditions attracted the British to establish the city in the dense forests of Himalayas. As the summer capital, Shimla hosted many important political meetings including the Simla Accord of 1914 and the Simla Conference of 1945. After independence, The state of Himachal Pradesh came into being in 1948 as a result of the integration of 28 princely states. Even after independence, the city remained an important political centre, hosting the Simla Agreement of 1972. After the reorganisation of the state of Himachal Pradesh, the existing Mahasu district was named Shimla. "
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
     /*   if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Dee"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });*/
        
    }); 
    //add a few comments
};


module.exports = seedDB;

