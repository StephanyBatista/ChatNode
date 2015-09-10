var moment = require('moment');

var usersOnline = [];
var rooms = [];

exports.configure = function(io){
	
	io.sockets.on('connection', function(client){
			
		if(!client.handshake.session.user)
		{
			client.emit('not-authorized');
			return;
		}
		
		addUsersOnline(client);
		setEvents(client);
		sendUsersOnline(client);
	});
}

function setEvents(client){
	
	client.on('send-message', function(msg){
			
		var user = client.handshake.session.user;
		
		var message = {
			user: user.name,
			userPicture: user.picture,
			message: msg,
			time: moment().format('MM-DD hh:mm')	
		};
		
		client.emit('get-message', message);
		client.broadcast.emit('get-message', message);
	});
	
	client.on('join', function(userName){
			
		var friend = getUseOnlineByName(userName);
		var userCurrent = getUseOnlineByName(client.handshake.session.user.name);
		client.emit('join-room', createOrGetRoom(userCurrent, friend));
	});
	
	client.on('disconnect', function(){
		
		removeUsersOnline(client);
		sendUsersOnline(client);
	});
}

function createOrGetRoom(userCurrent, friend){
	
	var room = null;
	
	for(var i = 0; i < rooms.length; i++)
	{
		if(rooms[i].type != 'S')
			continue;
		
		if((rooms[i].users[0].name == userCurrent.name && rooms[i].users[1].name == friend.name) ||
			(rooms[i].users[0].name == friend.name && rooms[i].users[1].name == userCurrent.name))
			room = rooms[i];
	}
	
	if(room == null)
	{
		room = {
			name: ''
		};
		
		room.users.push(friend);
		room.users.push(userCurrent);
		rooms.push(room);
	}
	
	return room;
}


function addUsersOnline(client){

	for(var i = 0; i < usersOnline.length; i++)
		if(usersOnline[i].name == client.handshake.session.user.name)
			return;
	
	var user = {
		name: client.handshake.session.user.name,
		picture: client.handshake.session.user.picture,
	};
	usersOnline.push(user);	
}

function removeUsersOnline(client){

	for(var i = 0; i < usersOnline.length; i++)
		if(usersOnline[i].name == client.handshake.session.user.name)
			usersOnline.splice(i, 1);
}

function sendUsersOnline(client){
	
	client.broadcast.emit('users-online', usersOnline);
	client.emit('users-online', usersOnline);
}

function getUseOnlineByName(userName){
	
	for(var i = 0; i < usersOnline.length; i++)
		if(usersOnline[i].name == userName)
			return usersOnline[i];
			
	return null;
}