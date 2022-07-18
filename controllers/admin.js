const Product = require('../models/product');
const db = require('../utils/database');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {
        title: 'Add Product', 
        path : req.originalUrl, 
        editing : false,
    });
}

exports.postProducts = (req,res,next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })
    .then(result => { 
        console.log(`Created Product: ${title}`)
        res.redirect('/admin/products');
    })
    .catch(err => { console.log(err)});
    
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    
    if( !(editMode==='true') ) {
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.findByPk(productId).then(product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            title: 'Update Product', 
            path : req.originalUrl, 
            editing : true,
            product : product,
        });
    }).catch(err => { console.log(err)});
    
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findByPk(productId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;
        return product.save();
    })
    .then(result => { 
        console.log(`UPDATE Product ${updatedTitle}`);
        res.redirect('/admin/products');
    })
    
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.id;
    Product.findByPk(productId)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        console.log(`DESTROYED Product ${result.title}`);
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req,res,next) => {
    Product.findAll().then(products => {
        res.render('admin/products', { 
            products : products, 
            title : "Admin Products", 
            path : req.originalUrl, 
        });
    }).catch(err => console.log(err));
}