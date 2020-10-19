const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/app"

const multer = require("multer");
const storage = multer.diskStorage({

    destination : function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }

});
const upload = multer({storage});

router.post("/", upload.single('image'), (req, res) => {
   
    // console.log(req.file);   
    // console.log(req.id);
    console.log(req.user);
    res.redirect(CLIENT_HOME_PAGE_URL);
  })

  module.exports = router;