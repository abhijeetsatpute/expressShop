const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = {
    get : function(cb){
        fs.readFile(dataFilePath, (err, data) => {
            if(!err){
                data.toString() == '' ? cb([]) : cb(JSON.parse(data));
            } else{
                cb([]);
            }
        });
    },
    add : function(product){
        fs.readFile(dataFilePath, (err, data) => {
            if(!err){
                const products = data.toString() == '' ? [] : JSON.parse(data);
                products.push(product);
                fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            } else{
                console.log(err);
            }
        });
    },
}