const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req
  //   .get('Cookie')
  //   .split(';')[0]
  //   .trim()
  //   .split('=')[1];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  // Totally Different Request and this gets end
  // session object is added by the session middleware
  // Thi is saved across requests but not across users 
  // using a middleware to pass the user from table
  User.findById('62fb794df4ccc916cf1fce0c')
  .then(user => {
    //Full mongoose model
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect('/')
  })
  .catch(err => console.log(err))
};
