const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
//? User Details Schemas
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: {
    street: String,
    city: String,
    pin: Number,
    state: String,
    country: String
  }
});

const User = mongoose.model("UserDetails", UserSchema);
module.exports = User;
// module.exports = mongoose.model("UserDetails", UserSchema);







// module.exports = {UserDetails:UserSchema,
//     ProductDetails:ProductDetails,
//     ShipperDetails:shipperDetails,
//     OrderDetails:OrderSchema
// }
