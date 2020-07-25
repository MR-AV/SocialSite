const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/app"
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000"

router.get("/", passport.authenticate('google', {
    scope : ["profile"]
}  
));

router.get("/feed",
 passport.authenticate('google', 
     {successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: CLIENT_LOGIN_PAGE_URL
    }
    )
);

module.exports = router;