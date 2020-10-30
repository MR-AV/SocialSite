const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : String,
    clientId : String,
    clientName : String
    // userId : String,
    // imageId : String
})
const Comment = new mongoose.model("Comment", commentSchema);
const imageSchema = new mongoose.Schema({
    url: String,
    caption : String,
    likes : [String],
    comments : [commentSchema]
});
const Image = new mongoose.model("Image", imageSchema);

const userSchema = new mongoose.Schema({
    userName: String,
    googleId: String,
    image: [imageSchema]
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = {
    userSchema,
    User,
    imageSchema,
    Image,
    commentSchema,
    Comment
}