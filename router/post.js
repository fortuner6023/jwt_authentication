const express = require("express");
const router = express.Router();
// const model = require('../models/user')
const UserDetails = require("../models/user");
const ProductDetails = require("../models/product");
const Login = require("../models/login");
const Register = require("../models/register");
const Order = require("../models/order");
const Ship = require("../models/shipper");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const verify = require('./verify')
const admin = require('../middleware/admin')


//?validation
const schema = {
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required(),
    userTypes: Joi.string()
    .min(3)
    .required(),
    
    
};

//? Post User Details
router.post("/user", (req, res) => {
  console.log("==>", req.body);
  const post = new UserDetails({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
      pin: req.body.address.pin,
      state: req.body.address.state,
      country: req.body.address.country
    }
  });
  post
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//?Post Product details and Category
router.post("/product", verify, (req, res) => {
  const product = new ProductDetails({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    color: req.body.color,
    size: req.body.size
  });
  product
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ error: err });
    });
});

//? get Product details
router.get("/product", verify,async (req, res) => {
  console.log("--inside ");
  console.log(req.params.productId);
  try {
    const product = await ProductDetails.find(req.params.productId);
    console.log(product);
    res.json(product);
  } catch (err) {
    res.json({ error: err });
  }
});

//? Update Products
router.patch("/user/:productId", verify,async (req, res) => {
  console.log("--inside ");
  try {
    const updatePost = await ProductDetails.updateOne(
      { _id: req.params.productId },
      {
        $set: req.body
      }
    )
    res.json(updatePost);
  } catch (err) {
    res.json({ error: err });
  }
});

//? User Registration details
router.post("/register", async (req, res) => {
  console.log(req.body);

  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await Register.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exist");

  //? Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
console.log("hello=>>>",req.body);
  const register = new Register({
    name: req.body.name,
    email: req.body.email,
    userTypes:req.body.userTypes,
    password: hashedPassword,
  
  });  
  register
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("check err===>",err);
      res.json({ error: err });
    });
});

//? User Login details
router.post("/login", async (req, res) => {
  console.log(req.body);

  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Register.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  const validPass = await bcrypt.compare(req.body.password,user.password );
  if (!validPass) return res.status(400).send("Password is not matched");
console.log("usertypes=>>>",user.userTypes);
  const token = jwt.sign({_id:user._id,name:user.name,role:user.userTypes},'shshshshshsh')

  res.header('auth-token', token).send({token:token})
});

 //?check get or post request with jwt
// router.get('/token',verify,(req,res)=>{
//   res.json({person:{name:'Naveen Saini', about:'hello from Naveen'}})
// })


//?Shipper Details
router.post("/shipper", verify,(req, res) => {
  console.log(req.body);
  const shipper = new Ship({
    name: req.body.name,
    phone: req.body.phone
  });
  shipper
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ error: err });
    });
});

//? User Order Product Details
router.post("/order", verify,(req, res) => {
  console.log(req.body);
  const order = new Order({
    product: req.body.product,
    user: req.body.user,
    quantity: req.body.quantity,
    shipDate: req.body.shipdate,
    totalPrice: req.body.totalPrice,
    shipperId: req.body.shipperId
  })
  order
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ error: err });
    });
});

//? get product based on category name

router.get("/list", verify,async (req, res) => {
  try {
    // const result = []
    const result = await ProductDetails.find({"category":"cloths"});
    res.json(result);
  } catch (err) {
    res.json({ error: err });
  }
});


// router.delete('/delete/:deleteID',[verify,admin],async (req,res)=>{
//   const deleted = await Register.findByIdAndRemove(req.params.deleteId)
//   if(!deleted) return res.status(404).send('this id is not found')
//   res.send(deleted)
// })

// //? get user order history by used id
// router.get("/find/:userId", async (req, res) => {
//   try {
//     const history = await Order.find({ user: "5d281ca0d7835f2c70415287" });
//     let dataList = history.map(data => data.ProductDetails);
//     console.log(dataList);
//     res.json({ dataList });
//   } catch (error) {
//     res.json({ error: err });
//   }
// });




module.exports = router;
