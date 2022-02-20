//TODO: Check required redirect dor guest and user

function isUser() {
  return function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/auth/login');
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
    //may not work
    const userId = req.session.user?._id;
    //TODO change property name to match collection
    if(res.locals.trip.owner == userId) {
      next()
    } else {
      res.redirect('/auth/login');
    }
  }
}


module.exports = {
    isGuest,
    isUser,
    isOwner
}