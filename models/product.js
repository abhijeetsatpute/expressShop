const fs = require('fs');
const path = require('path');

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
            products.push(product);
            fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    },
}