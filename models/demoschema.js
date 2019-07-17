const mongoose = require("mongoose");

//?Users informations
const userInfo = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: {
    street: String,
    city: String,
    pin: Number,
    state: String,
    country: String
  },
  buyItem: [{ type: mongoose.Schema.Types.ObjectId, ref: "AddProductList" }]
});
module.exports = mongoose.model("userInfo", userInfo);

//? service provider Information
const serviceProvider = mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String
  }
});
module.exports = mongoose.model("serviceProvider", serviceProvider);

//? Add Product to Service Provider
const addProduct = mongoose.Schema({
  category: String,
  name: String,
  model: String,
  price: Number,
  description: String,
  color: String,
  quantity: Number,
  image: { data: Buffer, contentType: String },
  spList: [{ type: mongoose.Schema.Types.ObjectId, ref: "serviceProvider" }]
});
module.exports = mongoose.model("AddProductList", addProduct);

//?Rating by Users
var commentSchema = mongoose.Schema({
  rating: { type: Number, default: 0 },
  review: String,
  // serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "serviceProvider" },
  user: {
    type: Schema.ObjectId,
    ref: "userinfo"
  }
});
module.exports = mongoose.model("comments", commentSchema);

//? shipper details
const shipperDetails = mongoose.Schema({
    name: String,
    phone: Number
});
module.exports = mongoose.model("shipInfo", shipperDetails);


//? Order Product with userinformation and Service Provider information
const OrderDetails = mongoose.Schema({
    userInfo : { type: mongoose.Schema.Types.ObjectId, ref: "userInfo" },
    product:{ type: mongoose.Schema.Types.ObjectId, ref: "AddProductList" },
    orderDate : {type:Date,default:Date.now},
    shipperInfo:{type:mongoose.Schema.Types.ObjectId,ref:"shipInfo"},
    shipDate:{type: Date},
    totalPrice:Number,

})
















