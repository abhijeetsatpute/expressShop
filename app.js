const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//using a middleware to pass the user from table
app.use((req, res, next) => {
  User.findByPk(1)
  .then(user => {
    //storing the user sequelize object in the request itself
    req.user = user;
    next();
  })
  .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//----------------------Defining Assocations--------------------------

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

//User has one Cart and inverse
User.hasOne(Cart);
Cart.belongsTo(User);

//Many to Many association, where is should be stored
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//Single Order will belong to one user, and User may have many Orders(One to many relationship)
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

//--------------------------------------------------------------------

sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then(user => {
    if(!user){
      return User.create({ name: 'John', email: 'john@example.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    //creating a cart here
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
