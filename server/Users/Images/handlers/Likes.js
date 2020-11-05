/*jshint esversion: 7*/

const express = require("express");
const router = express.Router();
const User = require("../../model").User;
const CLIENT_URL = "http://localhost:3000";




function getLikes(user,arr, imageId, userId){
   
    let i = arr.findIndex((element, index, arr) => (element.id == imageId))
    let j = arr[i].likes.findIndex((element) => (element == userId))

    if(j == -1) arr[i].likes.push(userId);
    else arr[i].likes.splice(j, 1)
   
    user.save(err => {
        if(err) return res.send("Unable to upload Image")
    })
     return arr[i].likes.length;   

}
router.post("/", (req, res) => {

    const userId = req.body.userId
    const imageId = req.body.imageId
    User.findById(userId, (err, user) => {

        if(err) return res.redirect(CLIENT_URL);
        let len = getLikes(user, user.image, imageId, req.user.id)
        return res.send({len : len})

    })
})


module.exports = router;