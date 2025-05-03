const asyncHandler = require('../utils/async-handler');
const passport = require('../middleware/passport');

const AuthMiddleware = async (req, res, next) => {
  passport.authenticate('user-login', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log("🚀 ~ passport.authenticate ~ err:", err)
      const error = new Error(info && info.message ? info.message : 'Unauthorized');
      error.statusCode = 401;
      return next(error);
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  AuthMiddleware
};