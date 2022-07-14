const Product = require('../models/product');

exports.getAddProduct = (req,res,next) => {
    res.render(
        'admin/add-product', 
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
    console.log(req.body);
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    Product.get(products => {
        res.render('admin/products', { 
            products : products, 
            title : "Admin Products", 
            path : req.originalUrl, 
        });
    });
}