const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

let connections = [];

server.listen(process.env.PORT || 8090);
console.log('Running server...');

app.use('/css', express.static(__dirname + '/public/assets/css'));
app.use('/js', express.static(__dirname + '/public/assets/js'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/resources/views/index.html');
});

app.get('/game', (req, res) => {
	res.sendFile(__dirname + '/resources/views/mainmenu.html');
});

io.on('connection', (client) => {
	connections.push(client);
	updatePlayerCount();
	console.log('Connected: %s client(s) connected currently.', connections.length);

	client.on('disconnect', () => {
		connections.splice(connections.indexOf(client), 1);
		updatePlayerCount();
		console.log('Disconnected: %s client(s) connected currently.', connections.length);
	});

	function updatePlayerCount() {
		io.emit('playerCount', connections.length);
	}

	client.on('createGame', (data, callback) => {
		callback('LLOSA5');
	});

	client.on('joinGame', (data, callback) => {
		if(data == 'LLOSA5') {
			callback({
				success: {
					msg: `you're in!`
				} 
			});
		} else {
			callback({
				error: {
					msg: `you're out!`
				} 
			});
		}
	});
});