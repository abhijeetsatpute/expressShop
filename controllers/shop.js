const Product = require('../models/product');

exports.getProducts = (req,res,next) => {
    Product.get(products => {
        res.render('shop/product-list', { 
            products : products, 
            title : "All Products", 
            path : req.originalUrl, 
        });
    });
}

exports.getProduct = (req,res,next) => {
    Product.findById(req.params.productId, product => {
        res.render('shop/product-detail', { 
            title : product.title,
            product : product, 
            path : '/products', 
        });
    })
}

exports.getIndex = (req, res, next) => {
    Product.get(products => {
        res.render('shop/index', {
            products : products, 
            title : "Shop", 
            path : req.originalUrl,
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path : req.originalUrl,
        title : "Your Cart",  
    });
}

exports.postCart = (req, res, next) => {
    const pordId = req.body.productId;
    console.log(pordId);
    res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path : req.originalUrl,
        title : "Checkout",  
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/cart', {
        path : req.originalUrl,
        title : "Your Orders",  
    });
}