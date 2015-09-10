var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;
var config = require('../configFacebook.json');

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new facebookStrategy({
    clientID: config.KEY,
    clientSecret: config.SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['displayName', 'photos', 'gender']
  },
  function(token, tokenSecret, profile, done) {
    // NOTA: Voce tera, provavelmente, que associar o usuario do facebook
    //       com um registro do usuario no seu banco de dados.
    var user = profile;
    return done(null, user);
  }
));

module.exports = passport;

