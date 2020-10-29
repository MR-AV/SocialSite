const express = require("express");
const router = express.Router();
const CLIENT_URL = "http://localhost:3000";
const User = require("../model").User;
const splitArray = require("./splitArray")
router.get("/", (req, res) => {

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
       }
   });
   }
   else res.redirect(CLIENT_URL);
});

module.exports = router