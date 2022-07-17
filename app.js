const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');

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

app.use(errorController.get404);

sequelize
    .sync()
    .then(result => {
        console.log(result);
        app.listen(3000);
    })
    .catch( err => { console.log(err) })
