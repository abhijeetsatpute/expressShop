const bcrypt = require('bcryptjs');

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

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // Totally Different Request and this gets end
  // session object is added by the session middleware
  // Thi is saved across requests but not across users 
  // using a middleware to pass the user from table
  User.findOne({ email: email })
  .then(user => {
    if (!user) {
      return res.redirect('/login');
    }
    bcrypt
      .compare(password, user.password)
      // Matched or Not Matched We will go into .then() 
      // Boolean value
      .then(doMatch => {
        // if doMatch is true ie. Password Matched
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        }
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
  })
  .catch(err => console.log(err))
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  // .destroy() is provided by the session package we using
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};