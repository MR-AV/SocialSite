const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get("/", passport.authenticate('google', {
    scope : ["profile"]
}  
));

router.get("/feed", passport.authenticate('google'), (req, res) => {
    console.log("i'm feed");
    res.send("i'm feed");
});

module.exports = router;