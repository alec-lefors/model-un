const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

let connections = [];

server.listen(process.env.PORT || 8080);
console.log('Running server...');

app.use('/css', express.static(__dirname + '/public/assets/css'));
app.use('/js', express.static(__dirname + '/public/assets/js'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/resources/views/index.html');
});

io.on('connection', (client) => {
	connections.push(client);
	console.log('Connected: %s client(s) connected currently.', connections.length);
});