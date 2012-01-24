var io = require('socket.io').listen(8000);

io.sockets.on('connection', function (socket) {
	//socket.emit('request','https://www.google.com/search?q=dgdffff');

	socket.on('request', function (url) {
		socket.broadcast.emit('request', url, socket.id);
	 });
	
	socket.on('results', function (details) {
		console.log("Got results");
		console.log(JSON.stringify(details));
		//console.log("Results " + JSON.stringify(details.data));
		console.log("Will write results to socket "+details.sid);
		console.log(io.sockets.socket(details.sid));
		
		
		io.sockets.socket(details.sid).emit('results',details.data);
	})
});
