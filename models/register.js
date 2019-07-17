
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const user = require('../middleware/admin')

//?User Registration
const UserRegister = mongoose.Schema({
    name: { type: String, required: true,min:6,max:255 },
    email: { type: String, required: true,min:6,max:255 },
    userTypes:{type:String,required:true},
    password: {type:String,required:true, max:1024},
});

  // UserRegister.method.generateAuthToken = ()=>{
  //   const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin },'shshshshshsh')
  //   return token
  // }
  
  const Register = mongoose.model("RegistrationDetails", UserRegister);
  module.exports = Register;





  