const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { PrismaClient } = require('@prisma/task/client');
const prisma = new PrismaClient();
const { config } = require("../config/constants")

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_KEY
};

passport.use("user-login", new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (user) {
      return done(null, user);
    } else {
      console.log("TCL: ", "error")
      return done(null, false, { message: 'Unauthorized' });
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;