const express = require("express");
const router = express.Router();
const User = require("../model.js").User;
const isLoggedin=require('../middleware/middleware').isLoggedIn;
router.get("/",isLoggedin,(req, res) => {

    User.findById(req.user.id, (err, user) => {

            if(err) return res.send({err: err})
            return res.send({userName : user.userName})

    }) })   


module.exports = router



