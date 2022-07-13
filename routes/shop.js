const path = require('path');

const express = require('express');

const rootDir = require('../utils/path')
const adminData = require('./admin')

const router = express.Router();

router.get('/',(req,res,next) => {
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views','shop.html'));
    res.render('shop', { 
        products : adminData.products, 
        title : "My Shop", 
        path : req.originalUrl, 
        hasProducts : products.length > 0,
        activeShop: true,
        productCSS: true
     });
})

module.exports = router;