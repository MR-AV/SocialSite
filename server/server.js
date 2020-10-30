const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./passport/routes/authRoutes");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const image = require("./Users/routes/uploadImage");
const key = require("./config/key");
// const Image = require("./Users/model").Image;
const User = require("./Users/model").User;
const splitArray = require("./Users/routes/splitArray");
const getImages = require("./Users/routes/getImages")
const Comments = require("./Users/routes/Comments")
const getUserName = require("./Users/routes/userName")
const CLIENT_URL = "http://localhost:3000";
require('./passport/services/passport.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: "MY POST",
    resave: false,
    saveUninitialized: false
}));

app.use('/images', express.static('uploads'));

app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

if(key.mongoID){
  mongoose.connect(`mongodb://${key.mongoID.username}:${key.mongoID.password}@${key.mongoID.host}:${key.mongoID.port}/${key.mongoID.database}?authSource=${key.mongoID.auth_database}`, {
    useNewUrlParser: true, useUnifiedTopology: true })
  .then(val=>{
    console.log("Connected to MongoDB");
  })
  .catch(err=>{
    console.log("Some error occured ", err);
  });
}else{
  mongoose.connect('mongodb://localhost:27017/SocialSiteDB');
}

mongoose.set("useCreateIndex", true);


app.get("/", (req, res) => {
    res.send("server is up and running on port 5000");
});


app.use("/get-images", getImages);
app.use('/upload/image', image);
app.use('/auth/google', router);
function getLikes(user,arr, imageId, userId){
    let  i = 0, j = 0;

    for(i; i < arr.length; i++){
        console.log(arr[i]._id)
    if(arr[i]._id == imageId){
        console.log("found image");    
        break;
        }

    }

    for( j = 0; j < arr[i].likes.length; i++)
        if(arr[i].likes[j] == userId)
        {
            console.log("foundUser");
            break;
        }

    if(j == arr[i].likes.length) arr[i].likes.push(userId);
    else arr[i].likes.splice(j, 1)
   
    user.save(err => {
        if(err) return res.send("Unable to upload Image")
    })
     return arr[i].likes.length;   

}
app.post("/postLikes", (req, res) => {

    const userId = req.body.userId
    const imageId = req.body.imageId
    User.findById(userId, (err, user) => {

        if(err) return res.redirect(CLIENT_URL);
        console.log("usr = ",user)
        let len = getLikes(user, user.image, imageId, req.user.id)
        console.log("len = ", len);
        let obj = {len : len}
        return res.send(obj)

    })
})

app.use("/getUserName", getUserName);
app.use("/Comment", Comments);

app.listen(PORT, function() {
    console.log(`server is up and running on port ${PORT}`);
});