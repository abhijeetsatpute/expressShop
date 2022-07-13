const Product = require('../models/product')

exports.getAddProduct = (req,res,next) => {
    res.render(
        'add-product', 
        {
            title: 'Add Product', 
            path : req.originalUrl, 
            formCSS: true, 
            productCSS: true, 
            activeProduct: true
        }
    );
}

exports.postProducts = (req,res,next) => {
    Product.add(req.body);
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    Product.get(products => {
        res.render('shop', { 
            products : products, 
            title : "My Shop", 
            path : req.originalUrl, 
            hasProducts : products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
}