const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: false
}));
//grant access to public files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => { console.log(error)});
})

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
    // .sync( {force: true} )
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            return User.create({name: 'John', email: 'john@example.com'});
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        app.listen(3000);
    })
    .catch( err => { console.log(err) })
