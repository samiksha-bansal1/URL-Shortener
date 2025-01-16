const { getUser } = require("../services/auth");

function checkForAuthenication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) {
    return next();
  }
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) res.redirect("/login");

    if (!roles.includes(req.user.role)) {
      res.end("UnAuthorized");
    }

    return next();
  };
}
module.exports = {
  checkForAuthenication,
  restrictTo,
};
