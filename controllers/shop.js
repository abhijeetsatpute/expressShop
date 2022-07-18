const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req,res,next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', { 
            products : products, 
            title : "All Products", 
            path : req.originalUrl, 
        });
    }).catch(err => console.log(err));
}

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    // Product.findAll({where: {id: prodId}})
    // .then(products => {
    //     res.render('shop/product-detail', { 
    //         title : products[0].title,
    //         product : products[0], 
    //         path : '/products', 
    //     });
    // }).catch(err => console.log(err));
    Product.findByPk(prodId).then(product => {
        res.render('shop/product-detail', { 
            title : product.title,
            product : product, 
            path : '/products', 
        });
    }).catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            products : products, 
            title : "Shop", 
            path : req.originalUrl,
        });
    }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
            .then(products => {
                res.render('shop/cart', {
                    path : req.originalUrl,
                    title : "Your Cart", 
                    products : products,
                });
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const pordId = req.body.productId;
    Product.findById(pordId, (product) => {
        Cart.addProduct(pordId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.id;
    Product.findById(productId)
        .then(product => {
            Cart.deleteProduct(productId, product.price);
            res.redirect('/cart');
        })
        .catch( err => { console.error(err) })
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