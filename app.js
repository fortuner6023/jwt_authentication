const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 6023;
const bodyParser = require('body-parser')
const routes = require('./router/post')

app.use(bodyParser.json())
app.use(express.json())
app.use('/api',routes)






//Connet to mongo db
mongoose.connect(
    'mongodb+srv://fortuner6023:Ram@12345@cluster0-pg5bs.mongodb.net/test?retryWrites=true&w=majority ',{useNewUrlParser:true},
    ()=>{
    console.log('connected to mongo DB');
})


app.listen(port,()=>{
    console.log('Server is running on port ',port);
})