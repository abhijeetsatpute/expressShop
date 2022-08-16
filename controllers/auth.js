exports.getLogin = (req, res, next) => {
  const isLoggedIn = req
    .get('Cookie')
    .split(';')[0]
    .trim()
    .split('=')[1];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  // Totally Different Request and this gets end
  // session object is added by the session middleware
  // Thi is saved across requests but not across users 
  req.session.isLoggedIn = true;
  res.redirect('/')
};
