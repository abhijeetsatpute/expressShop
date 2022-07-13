const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const errorController = require('./controllers/error');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: false
}));
//grant access to public files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use(errorController.get404);

app.listen(3002)