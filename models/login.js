const mongoose = require("mongoose");

//? User Login details
const UserLogin = mongoose.Schema({
    email: { type: String, require: true },
    password: String,
    userTypes:String
  });
  const Login = mongoose.model("LoginDetails", UserLogin);
  module.exports = Login;