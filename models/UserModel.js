const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String
});

const User = mongoose.model("pdc-user", userSchema);

module.exports = User;