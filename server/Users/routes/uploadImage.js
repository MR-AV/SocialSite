const express = require("express");
const Image = require("../model").Image;

const router = express.Router();
const CLIENT_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = `${CLIENT_URL}/app`;

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

router.post("/", upload.single('image'), (req, res) => {
    // console.log(req.user, req.filename);
    const image = new Image({ url: `${CLIENT_URL}/images/${req.filename}` });
    image.save(err => {
        if (err)
            res.send("Some error");
        else
            res.redirect(CLIENT_HOME_PAGE_URL);
    });
    // console.log(Image);
    // res.redirect(CLIENT_HOME_PAGE_URL);

});

module.exports = router;