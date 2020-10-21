const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: String
});
const Image = new mongoose.model("Image", imageSchema);

const userSchema = new mongoose.Schema({
    userName: String,
    googleId: String,
    imageUrl: [String]
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = {
    userSchema,
    User,
    imageSchema,
    Image
}