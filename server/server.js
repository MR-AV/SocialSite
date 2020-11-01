const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./passport/routes/authRoutes");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const key = require("./config/key");
const User = require("./Users/model").User;
const CLIENT_URL = "http://localhost:3000";
const Image = require("./Users/Images/routes/Images")

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

app.use('/image', Image);
app.use('/auth/google', router);


app.listen(PORT, function() {
    console.log(`server is up and running on port ${PORT}`);
});