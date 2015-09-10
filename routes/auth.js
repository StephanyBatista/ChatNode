var passport = require('../lib/passport');

module.exports = function(app){
	
	app.get('/auth/facebook', app.passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', app.passport.authenticate('facebook', { successReturnToOrRedirect: '/logon', failureRedirect: '/' }));
}