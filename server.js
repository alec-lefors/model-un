const users = [
	{
		name: 'Alec',
		country: 2,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	},
	{
		name: 'Cameron',
		country: 6,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	},
	{
		name: 'Logan',
		country: 7,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	},
	{
		name: 'Joe',
		country: 1,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	}
];

const globalEcon = {
	money: 40,
	military: 40,
	humanitarian: 40,
	intel: 40,
	material: 40
}


const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const turn = require('./randomCrisis.js');

turn.start(users, globalEcon, 1);

let connections = [];
let rooms = [];
let ingame = [];

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
		leaveLobby(client);
		console.log('Disconnected: %s client(s) connected currently.', connections.length);
	});

	function updatePlayerCount() {
		io.emit('playerCount', connections.length);
	}

	client.on('createGame', (data, callback) => {
		const code = makeRoomCode();
		rooms.push(code);
		client.join(code);
		client.room = {leader: true, code: code};
		callback(code);
	});

	client.on('disband', (data, callback) => {
		const roomCode = client.room.code;
		if(client.room.leader) {
			const clients = io.sockets.adapter.rooms[roomCode].sockets;
			for (let clientId in clients) {
				let clientSocket = io.sockets.connected[clientId];
				if(!clientSocket.room.leader) clientSocket.emit('gameDisbanded');
				clientSocket.leave(roomCode);
				clientSocket.room = {};
			}
			rooms.splice(rooms.indexOf(roomCode), 1);
			callback({
				success: {
					msg: `Game disbanded`
				}  
			});
		} else {
			callback({
				error: {
					msg: `You are not the party leader!`
				}  
			});
		}
	});

	client.on('leaveLobby', (data) => {
		leaveLobby(client);
	});

	client.on('joinGame', (roomCode, callback) => {
		roomCode = roomCode.toUpperCase();
		if(rooms.indexOf(roomCode) > -1) {
			if(io.sockets.adapter.rooms[roomCode].length >= 10) {
				callback({
					error: {
						msg: `Lobby is full.`
					}  
				});
			}
			client.room = {leader: false, code: roomCode};
			client.join(roomCode);
			updateUsersIn(roomCode);
			callback({
				success: {
					msg: `Joined room!`
				} 
			});
		} else {
			callback({
				error: {
					msg: `Could not find the room.`
				}  
			});
		}
	});

	function leaveLobby(client) {
		if('room' in client && 'code' in client.room) {
			const roomCode = client.room.code;
			console.log(`Leaving ${roomCode}`);
			client.leave(roomCode);
			client.room = {};
			updateUsersIn(roomCode);
		}
	}

	function updateUsersIn(roomCode) {
		const room = io.sockets.adapter.rooms[roomCode];
		if(room) {
			io.to(roomCode).emit('currentUsers', room.length);
		}
	}

	// GAME TIME
	client.on('start game', () => {
		const roomCode = client.room.code;
		if(client.room.leader) {
			const room = io.sockets.adapter.rooms[roomCode];
			if(room && room.length > 1) {
				rooms.splice(rooms.indexOf(roomCode), 1);
				ingame.push(roomCode);
				let amountReady = 0;
				const clients = room.sockets;
				for (let clientId in clients) {
					let clientSocket = io.sockets.connected[clientId];
					clientSocket.emit('start game', (isReady) => {
						if(!isReady) clientSocket.emit('gameDisbanded');
						amountReady++;
						readyUp(amountReady, room.length)
							.then(() => {
								startGame(roomCode);
							});
					});
				}
			}
		}
	});

	function readyUp(amountReady, numOfPlayers) {
		return new Promise( (resolve, reject) => {
			if(amountReady == numOfPlayers) resolve();
		});
	}

	function startGame(gameCode) {
		const room = io.sockets.adapter.rooms[gameCode];
		const players = room.sockets;
		console.log(`Started game for room ${gameCode}`);
		io.to(gameCode).emit('bootGame');
	}
});

function makeRoomCode(length = 6) {
	let result = '';
	do {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
	} while(rooms.indexOf(result) != -1 && ingame.indexOf(result) != -1);
	return result;
}