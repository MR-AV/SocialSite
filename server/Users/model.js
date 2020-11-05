/*jshint esversion: 7*/
const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : String,
    clientId : String,
    clientName : String
    // userId : String,
    // imageId : String
})
//const Comment = new mongoose.model("Comment", commentSchema);
const imageSchema = new mongoose.Schema({
    url: String,
    caption : String,
    comments : [commentSchema],
    likes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    postAt : Date,
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Image = new mongoose.model("Image", imageSchema);

const userSchema = new mongoose.Schema({
    userName: String,
    googleId: String,
    //profileImage : { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    image : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = {
    userSchema,
    User,
    imageSchema,
    Image,
    commentSchema,
}