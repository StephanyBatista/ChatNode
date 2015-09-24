module.exports = function(app, controller){
	
	app.get('/chat', controller.index);
}