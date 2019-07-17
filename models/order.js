
const mongoose = require('mongoose');

//?  Order Details Schema
const OrderSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "ProductDetails" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetails" },
    quantity: Number,
    orderDate: { type: Date, default: Date.now },
    shipDate: String,
    totalPrice: Number,
    shipperId: { type: mongoose.Schema.Types.ObjectId, ref: "ShipperDetails" },
    

  });
  const Order = mongoose.model("OrderDetails", OrderSchema);
  module.exports = Order;
// module.exports = mongoose.model('OrderDetails',OrderSchema)
