const db = require('../utils/database');
const Cart = require('./cart');

module.exports = {
    get : function(){
        return db.execute("SELECT * FROM products");
    },
    add : function(product){
            return  db.execute(
                "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
                [product.title, product.price, product.imageUrl, product.description]
            );
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