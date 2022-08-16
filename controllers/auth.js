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
  // Different Set-Cookie Values :
  // - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
  res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=100');
  res.redirect('/')
};
