const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/key');



passport.use(new GoogleStrategy({

    clientID : keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL : "http://localhost:5000/auth/google/feed",

},
    (accessToken, refreshToken, profile, cb) => {
        console.log(accessToken);
        // cb(null, "abcs");
    }
)
);