module.exports = function(app){
	
	var chatController = require('../controllers/chat');
	var homeController = require('../controllers/home');
	var chatRouter = require('../routes/chat');
	var homeRouter = require('../routes/home');
	var authRouter = require('../routes/auth')
	
	//Routers
	authRouter(app, app.passport);
	homeRouter(app, homeController);
	chatRouter(app, chatController);
}