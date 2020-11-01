const express = require("express");
const router = express.Router();
const Image = require("../../model").Image;
const User = require("../../model").User;
const Comment = require("../../model").Comment;
const CLIENT_URL = "http://localhost:3000";
const isLoggedin=require('../../middleware/middleware').isLoggedIn;

function findImage(arr, imageId){
    for(let i = 0; i < arr.length; i++)
        if(arr[i]._id == imageId)
            return i;
    

    return -1;
}
router.post("/postComment", (req, res) => {

    const userId = req.body.userId
    const imageId = req.body.imageId
    const text = req.body.comment
    const clientName = req.body.clientName
    User.findById(userId, (err, user) => {

        if(err) return res.redirect(CLIENT_URL);
        
        let index = findImage(user.image, imageId);
        
            let message = new Comment({
                comment : text,
                clientId : req.user.id,
                clientName : clientName
            })
            user.image[index].comments.push(message);
            user.save( err => {
                if(err)
                return res.redirect(CLIENT_URL);   
                return res.send({len : user.image[index].comments.length}) 
            })

           

    })

})

router.post("/getComments", (req, res) => {

    const userId = req.body.userId
    const imageId = req.body.imageId

    User.findById(userId, (err, user) => {

        if(err) return res.redirect(CLIENT_URL);
        
        let index = findImage(user.image, imageId);

           return res.send({comments : user.image[index].comments})
           

    })

})
module.exports = router;