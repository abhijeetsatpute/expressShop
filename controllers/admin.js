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
    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })
    .then(result => { console.log(`Created Product: ${title}`)})
    .catch(err => { console.log(err)});
    
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    
    if( !(editMode==='true') ) {
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.findById(productId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            title: 'Update Product', 
            path : req.originalUrl, 
            editing : true,
            product : product,
        });
    })
    
}

exports.postEditProduct = (req, res, next) => {
    Product.add(req.body);
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    res.redirect('/admin/products');
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