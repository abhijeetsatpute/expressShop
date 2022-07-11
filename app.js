const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(adminRoutes);
app.use(shopRoute);

app.listen(3000)