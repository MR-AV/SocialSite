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
const splitArray = require("./Users/routes/getImages");
const CLIENT_URL = "http://localhost:3000";
require('./passport/services/passport.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "MY POST",
    resave: false,
    saveUninitialized: false
}));

app.use('/images', express.static('uploads'));

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//     console.log("this runs always")
//     next();
// })
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
    res.send("HOLA!!!! TERE MUH ME LOL...");
});


app.get("/get-images", (req, res) => {
     if(req.isAuthenticated()){
    User.find({}, 'image', (err, images) => {
        if (err) {
            console.error("Some error occured ", err);
            res.status(504);
            res.send("Some error occured");
        } else {
            console.log(images);
            ans = splitArray(images);
            console.log(ans);
            res.send(ans);
            // res.send(images);
        }
    });
    }
    else res.redirect(CLIENT_URL);
});
// app.get("/get-images", (req, res) => {
//     User.find((err, images) => {
//         if (err) {
//             console.error("Some error occured ", err);
//             res.status(504);
//             res.send("Some error occured");
//         } else {
//             console.log(images);
//             res.send(images);
//         }
//     });
// });


app.use('/upload/image', image);
app.use('/auth/google', router);


app.listen(PORT, function() {
    console.log(`server is up and running on port ${PORT}`);
});