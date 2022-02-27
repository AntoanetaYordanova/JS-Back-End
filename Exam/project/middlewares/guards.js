//TODO: Check required redirect dor guest and user

function isUser() {
  return function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
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

function isOwner() {
  return function(req, res, next) {
    const userId = req.session.user?._id;
    if(res.locals.data.author._id == userId) {
      next()
    } else {
      res.redirect('/login');
    }
  }
}


module.exports = {
    isGuest,
    isUser,
    isOwner
}