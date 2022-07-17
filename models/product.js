const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const dataFilePath = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(dataFilePath, (err, data) => {
        if(!err){
            data.toString() == '' ? cb([]) : cb(JSON.parse(data));
        } else{
            cb([]);
        }
    });
}

module.exports = {
    get : function(cb){
        getProductsFromFile(cb);
    },
    add : function(product){
        getProductsFromFile(products => {
            if(product.id){
                const exisitingProductIndex = products.findIndex(prod => prod.id == product.id);
                const updateProducts = [...products];
                updateProducts[exisitingProductIndex] = product;
                fs.writeFile(dataFilePath, JSON.stringify(updateProducts), (err) => {
                    console.log(err);
                });
            } else {
                product.id = Math.random().toString();
                products.push(product);
                fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        })
    },
    findById : function(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    },
    deleteById : function(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            const exisitingProductIndex = products.findIndex(prod => prod.id == id);
            const updateProducts = [...products];
            updateProducts.splice(exisitingProductIndex, 1);
            // OR use filter method to return those elemts which not contains the id
            // products.filter(prod => prod.id !== id)
            fs.writeFile(dataFilePath, JSON.stringify(updateProducts), (err) => {
                if(!err){
                    Cart.deleteProduct(id, product);
                }
            });
        })
    }
}