var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopapi');


var products = [
    new Product({
        
        name: 'Product Name',
        description: 'Product description',
        price: 200,
        color:'red',
        category: 'Shoe',
        productImage: '/images/shoes/1.jpg',

    }),

    new Product({
        name: 'Product Name',
        description: 'Product description',
        price: 200,
        color: 'red',
        category: 'Shoe',
        productImage: '/images/shoes/2.jpg',
    }),
    new Product({
        name: 'Product Name',
        description: 'Product description',
        price: 400,
        color: 'red',
        category: 'Shoe',
        productImage: '/images/shoes/3.jpg',
    }),
    new Product({
        name: 'Product Name',
        description: 'Product description',
        price: 100,
        color: 'red',
        category: 'Shoe',
        productImage: '/images/shoes/4.jpg',
    }),
   
    new Product({

        name: 'Product Name',
        description: 'Product description',
        price: 200,
        color: 'red',
        category: 'Shoe',
        productImage: '/images/shoes/5.jpg',

    }),

    new Product({
        name: 'Product Name',
        description: 'Product description',
        price: 200,
        color: 'red',
        category: 'Shoe',
        productImage: '/images/shoes/6.jpg',
    }),
    new Product({
        name: 'Product Name',
        description: 'Product description',
        price: 400,
        color: 'red',
        category: 'Shoe',
        productImage: '/images/shoes/7.jpg',
    }),
    new Product({
        name: 'Product Name',
        description: 'Product description',
        price: 100,
        color: 'red',
        category: 'Shoe',
        productImage: '/images/shoes/8.jpg',
    }),
    
    
    
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}