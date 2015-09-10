module.exports = function(app){
	
	var homeController = {
		
		index: function(request, response){
			response.render('home/index', {title: 'teste'});
		},
		
		logon: function(request, response){
			
			if(!request.user)
				response.redirect('/');
				
			request.session.user = {
				name: request.user.displayName,
				picture: request.user.photos[0].value
			};
			 
			response.redirect('/chat');
		}	
	};
	
	return homeController;
}