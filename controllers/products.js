const Product = require('../models/product');

exports.getAddProduct = (req,res,next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
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
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    const products = Product.fetchAll();
    res.render('shop', { 
        products : products, 
        title : "My Shop", 
        path : req.originalUrl, 
        hasProducts : products.length > 0,
        activeShop: true,
        productCSS: true
     });
}