
const findOrCreate = require("mongoose-findorcreate");
const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
  userName : String,
  googleId: String,
  // Images  : [String]
});


userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);



exports.User = User;
exports.userSchema = userSchema;