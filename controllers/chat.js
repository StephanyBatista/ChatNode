module.exports = {
		
	index : function(request, response){
		
		if(!request.session.user)
			response.redirect('/');
		
		response.render('chat/index');
	}
};
	
	