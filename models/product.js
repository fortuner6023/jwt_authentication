const mongoose = require('mongoose')

//? Product Details Schemas
const ProductDetails = mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    description: String,
    color: String,
    size: Number
  });
  
  const Product = mongoose.model("ProductDetails", ProductDetails);
  module.exports = Product;
  // module.exports = mongoose.model("ProductDetails",ProductDetails);