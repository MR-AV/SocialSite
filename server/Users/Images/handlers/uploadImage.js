/*jshint esversion: 7*/

const express = require("express");
const Image = require("../../model").Image;
const User = require("../../model").User;
const isLoggedin=require('../../middleware/middleware').isLoggedIn;
const router = express.Router();
const CLIENT_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = `${CLIENT_URL}/feed/app`;
const SERVER_URL = "http://localhost:5000";
const fs = require("fs");
const multer = require("multer");

function getUniqueFileName(length){
    buffer = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    filename = '';

    for(var i=0;i<length;i++)
        filename += buffer[Math.floor(Math.random()*buffer.length)];
    
    if(fs.existsSync(`uploads/${filename}`))    return getUniqueFileName(length);
    
    return filename;
}


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        fileName = getUniqueFileName(30);
        req.image_url = `${SERVER_URL}/images/${fileName}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });


router.post("/",isLoggedin, upload.single('image'), (req, res) => {

    user = req.user;
    image_url = req.image_url;
    image = new Image({
        url: image_url,
        caption: req.body.caption,
        userId: user.id,
        postAt: new Date(), 
        likes: [],
        comments: []
    });
    image.save((err)=>{
        if(err){
            console.error(err);
            return res.send({'success': false, 'error': err, 'error_scource': 'image'})
        }else{
            user.image.push(image.id);
            user.save(err=>{
                if(err){
                    console.error(err);
                    return res.send({'success': false,  'error': err, 'error_scource': 'user'})
                }
                else
                   return res.redirect(CLIENT_HOME_PAGE_URL);
            });
        }
    });
});



module.exports = router;