const express = require("express");
// const Image = require("../model").Image;
const User = require("../model").User;
const isLoggedin=require('../middleware/middleware').isLoggedIn;
const router = express.Router();
const CLIENT_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = `${CLIENT_URL}/app`;
const SERVER_URL = "http://localhost:5000";

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        req.filename = file.originalname;
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });


router.post("/",isLoggedin, upload.single('image'), (req, res) => {

    if(req.isAuthenticated()){
    User.findById(req.user.id, function(err, user){

        if(err) res.send("Unable to upload Image");
        else{
            if(user){

                const Url = `${SERVER_URL}/images/${req.filename}`;
                user.imageUrl.push(Url);
                user.save(err => {
                    if(err) res.send("Unable to upload Image")
                    return res.redirect(CLIENT_HOME_PAGE_URL);
                })

            }
            else res.send("User Not found");
        }
    });

}
    else
        res.redirect(CLIENT_URL);

});

/*router.post("/", upload.single('image'), (req, res) => {
    // console.log(req.user, req.filename);
    const image = new Image({ url: `${SERVER_URL}/images/${req.filename}` });
    image.save(err => {
        if (err)
            res.send("Some error");
        else
            res.redirect(CLIENT_HOME_PAGE_URL);
    });
    // console.log(Image);
    // res.redirect(CLIENT_HOME_PAGE_URL);

});*/

module.exports = router;