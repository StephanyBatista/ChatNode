var socket = io();

function sendKeyEnter(e) {
    if (e.keyCode == 13) {
    	socket.emit('send-message', $('#message-send').val());
		$('#message-send').val('');    
        return false;
    }
}

$('#send').click(function(){
	socket.emit('send-message', $('#message-send').val());
	$('#message-send').val('');
});

socket.on('users-online', function(users, userCurrent){
	
	var hasUserOnline = false;
	$('#users-online').text('');
	
	for(var i = 0; i < users.length; i++){
		
		var userFormated = getUserOnlineFormated(users[i]);
		$('#users-online').append(userFormated);
		hasUserOnline = true;
	}
	
	if(!hasUserOnline)
		$('#users-online').append('Without user online');
	
});

socket.on('get-message', function(message){
	
	$('#messages').append(getMessageFormated(message));
	$('#messages').scrollTop();
	
});

socket.on('not-authorized', function(){
	
	window.location = '/';
	
});

function getMessageFormated(message){
	
	var li = $('<li class="media">');
	var mediaBody = $('<div class="media-body">');
	var media = $('<div class="media">');
	var a = $('<a class="pull-left" href="#"><img class="media-object img-circle" height="64" src="' + message.userPicture + '"></a>');
	var messageMediaBody = $('<div class="media-body">');
	var small = $('<small class="text-muted">');
	var hr = $('<hr>');

	li.append(mediaBody);
	mediaBody.append(media);
	media.append(a);
	media.append(messageMediaBody);
	media.append(small);
	media.append(hr);
	messageMediaBody.append(message.message);
	small.append('' + message.user + ' | ' + message.time + '');
	
	return li;
}

function getUserOnlineFormated(user){
	
	var li = $('<li class="media">');
	var mediaBody= $('<div class="media-body">');
	var media = $('<div class="media">');
	var a = $('<a class="pull-left" href="#"><img class="media-object img-circle" height="64" src="' + user.picture + '"></a>');
	var userMediaBody = $('<div class="media-body">');
	var h5 = $('<h5>');
	
	li.append(mediaBody);
	mediaBody.append(media);
	media.append(a);
	media.append(userMediaBody);
	userMediaBody.append(h5);
	h5.append(user.name);
	
	return li;
}
