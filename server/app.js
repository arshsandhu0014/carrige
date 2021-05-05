const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
const DBCONNECTION = process.env.DBCONNECTION;
const SERVERPORT = process.env.SERVERPORT;


const authRoute = require('./routes/auth');
const productsRoute = require('./routes/products');

app.use(cors());
app.use(express.json());
app.use('/auth',authRoute);
app.use('/products',productsRoute);

app.get('/',(req,res) => {
    res.send("<h1>Welcome!</h1>");
});

app.listen(SERVERPORT,function(){
    console.log(`Server in running on port ${SERVERPORT}`);
});

mongoose.connect(DBCONNECTION,{ useNewUrlParser: true , useUnifiedTopology: true })
.then((err)=>console.log("Connected to Database"))
.catch(err=>console.log(err));

module.exports = app;