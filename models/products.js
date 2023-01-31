const mongoose = require('mongoose');

// Schemas are the structure of our data, and the data types

const productSchema = new mongoose.Schema({
    product: String,
    imgUrl: String,
    description: String,
    price: Number,
    productAmt: Number
})

const MyProduct = mongoose.model('MyProduct', productSchema)


module.exports = MyProduct;