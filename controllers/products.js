const products = [];

exports.addProduct = (req,res,next) => {
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
    console.log(req.body);
    products.push({ title : req.body.title });
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    // res.sendFile(path.join(rootDir, 'views','shop.html'));
    res.render('shop', { 
        products : products, 
        title : "My Shop", 
        path : req.originalUrl, 
        hasProducts : products.length > 0,
        activeShop: true,
        productCSS: true
     });
}