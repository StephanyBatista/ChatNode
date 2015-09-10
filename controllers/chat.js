module.exports = function(app){
	
	var chatController = {
		
		index : function(request, response){
			
			if(!request.session.user)
				response.redirect('/');
			
			response.render('chat/index');
		}
	};
	
	return chatController;
}