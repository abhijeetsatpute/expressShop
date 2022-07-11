const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/admin',adminRoutes);
app.use(shopRoute);

app.use((req, res, next) => {
    res.status(404).send('<p>404 Page Not Found</p>');
});

app.listen(3000)