const path = require('path');

const express = require('express');

const rootDir = require('../utils/path')

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product',(req,res,next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {title: 'Add Product', path : req.originalUrl, formCSS: true, productCSS: true, activeProduct: true});
})

// /admin/add-product => POST
router.post('/add-product',(req,res,next) => {
    console.log(req.body);
    products.push({ title : req.body.title });
    res.redirect('/');
})

module.exports.routes = router;
module.exports.products = products;