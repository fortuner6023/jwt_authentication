
const mongoose = require('mongoose')

//? shipper details
const shipperDetails = mongoose.Schema({
    name: String,
    phone: Number
  });
  const Ship = mongoose.model("ShippersDetails", shipperDetails);
  module.exports = Ship;
  // module.exports = mongoose.model('ShipperDetails',shipperDetails)