module.exports = function(app){
	
	var controller = app.controllers.chat;
	app.get('/chat', controller.index);
}