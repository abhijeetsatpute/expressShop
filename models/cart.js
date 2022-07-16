const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'cart.json');


module.exports = {
    addProduct : function(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(dataFilePath, (err, data) => {
            let cart = { products: [], totalPrice: 0}
            if(!err){
                cart = data.toString() === "" ? cart : JSON.parse(data);
            }
            // Analyze the cart => Find existing products
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(dataFilePath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    },
    deleteProduct : function(id, productPrice){
        fs.readFile(dataFilePath, (err, data) => {
            if(err){
                return;
            }
            const updatedCart = { ...JSON.parse(data) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const prouctQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * prouctQty;
            fs.writeFile(dataFilePath, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }
}