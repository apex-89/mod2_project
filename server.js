const express = require('express');
const mongoose = require('mongoose');

// allows use of info from .env in this file 
require('dotenv').config();

// NEED TO PUT OBJECT MODEL
const MyProduct = require('./models/products') ;

// create app by calling express function
const app = express();

const cors = require('cors')
app.use(cors({
    origin: '*'
}));

// parses string JSON into actual objects found in req.body
app.use(express.json());

// allow use of queries in url ex:(?product=2&color=green)
// extended allows nested objects in url
app.use(express.urlencoded({extended:true}));

// tells express to serve our public folder by default when request is made to this port
app.use(express.static('public'));

// mongoDB link/ hide user and passwords
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.1eeko3p.mongodb.net/storefront?retryWrites=true&w=majority`;


mongoose.set('strictQuery', false);
// connect to our mongoDB database
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// let us know we have connected to database
mongoose.connection.once('open', () => {
    console.log("connected to mongoDB");
});


app.get('/get_products', async (req,res) => {
    let response = await MyProduct.find({});
    res.json(response);
});

app.get('/get_specific_product/:product_id', async (req,res) => {
    let id = req.params.product_id
    let response = await MyProduct.findById(id)
    res.send(response)
});


app.get('/search_product/', async (req,res) => {
    let productName = req.query.product
    let regex = new RegExp(["^", productName, "$"].join(""), "i");
    let response = await MyProduct.findOne({product: regex})
    if(response !== null){
    res.send(response)
    }else{
        res.send(req.query)
    }
});

app.post('/create_product', async (req, res) =>{
    const {productString: product, urlString: imgUrl, descriptionString: description, priceNumber: price, inventoryNumber: productAmt} = req.body;

    // Model methods usually give us a promise, so we can wait for the response
    let returnedValue = await MyProduct.create({
        product,
        imgUrl,
        description,
        price,
        productAmt
    });


    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);

});

app.delete('/delete_product/', async (req,res) => {
    let product = req.query.id
    let response = await MyProduct.findByIdAndDelete(product)
    res.send(response)
});

app.put('/update_product/', async (req,res) => {
    let product = req.query.id
    let response = await MyProduct.findByIdAndUpdate(product, req.body)
    res.send(response);
});


app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
});