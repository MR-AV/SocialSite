const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app"
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000"

const upload = require("../handlers/uploadImage")
const getImages = require("../handlers/getImages")
const Comments = require("../handlers/Comments")
const Likes = require("../handlers/Likes")
const isLoggedin = require('../../middleware/middleware').isLoggedIn;

router.use("/", isLoggedin)
router.use("/upload/image",upload)
router.use("/get-images", getImages)
router.use("/Comment", Comments)
router.use("/postLikes", Likes)

module.exports = router