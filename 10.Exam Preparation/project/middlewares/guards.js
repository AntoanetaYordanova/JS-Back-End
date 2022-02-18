function isUser() {
  return function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  };
}

function isGuest() {
  return function (req, res, next) {
    if (req.session.user) {
      res.redirect('/');
    } else {
      next();
    }
  };
}


module.exports = {
    isGuest,
    isUser
}