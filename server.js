const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const turn = require('./randomCrisis.js');
const variables = require('./variables.js');

let connections = [];
let rooms = [];
let ingame = [];

server.listen(process.env.PORT || 8090);
console.log('Running server...');

app.use('/css', express.static(__dirname + '/public/assets/css'));
app.use('/sw.js', express.static(__dirname + '/app/sw.js'));
app.use('/audio', express.static(__dirname + '/public/assets/audio'));
app.use('/images', express.static(__dirname + '/public/assets/images'));
app.use('/js', express.static(__dirname + '/public/assets/js'));
app.use('/manifest.json', express.static(__dirname + '/public/manifest.json'));
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
	client.username = randName();
	client.emit('username', {username: client.username, id: client.id});

	// DEV CODE ONLY

	client.join('TEST');
	if (connections.length >= 2) {
		startGame('TEST');
	}

	// REMOVE AFTER DEVING

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
		if(client.room && client.room.leader) {
			const roomCode = client.room.code;
			const clients = io.sockets.adapter.rooms[roomCode].sockets;
			for (let clientId in clients) {
				let clientSocket = io.sockets.connected[clientId];
				if(!clientSocket.room.leader) clientSocket.emit('gameDisbanded', `${client.username} disbanded the party.`);
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

	client.on('leaveLobby', () => {
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
				return;
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
			return;
		}
	});

	function leaveLobby(client) {
		if('room' in client && 'code' in client.room) {
			const roomCode = client.room.code;
			client.leave(roomCode);
			client.room = {};
			updateUsersIn(roomCode);
		}
	}

	function updateUsersIn(roomCode) {
		const room = io.sockets.adapter.rooms[roomCode];
		let users = [];
		if(room) {
			const clients = room.sockets;
			for (let clientId in clients) {
				let clientSocket = io.sockets.connected[clientId];
				users.push(clientSocket.username);
			}
			io.to(roomCode).emit('currentUsers', users);
		}
	}

	// GAME TIME
	client.on('start game', () => {
		if(client.room && client.room.leader) {
			const roomCode = client.room.code;
			const room = io.sockets.adapter.rooms[roomCode];
			if(room && room.length > 1) {
				rooms.splice(rooms.indexOf(roomCode), 1);
				ingame.push(roomCode);
				let amountReady = 0;
				const clients = room.sockets;
				const lobbyAmount = room.length; 
				for (let clientId in clients) {
					let clientSocket = io.sockets.connected[clientId];
					clientSocket.emit('start game', (isReady) => {
						if(isReady) amountReady++;
						if(!isReady) io.to(roomCode).emit('gameDisbanded', `${clientSocket.username} quit the game.`);
						readyUp(amountReady, lobbyAmount)
							.then(() => startGame(roomCode))
							.catch(() => {});
					});
				}
			}
		}
	});

	function readyUp(amountReady, numOfPlayers) {
		return new Promise( (resolve, reject) => {
			if(amountReady == numOfPlayers) {
				resolve();
			} else {
				reject();
			}
		});
	}

	function startGame(gameCode) {
		const room = io.sockets.adapter.rooms[gameCode];
		const clients = room.sockets;
		let users = [];
		let countriesLeft = [variables.countries];  
		console.log(`Started game for room ${gameCode}`);

		for (const clientId in clients) {
			let clientSocket = io.sockets.connected[clientId];
			let user = {...variables.user};
			user.name = clientSocket.username;
			user.id = clientId;
			users.push(user);
			console.log(user);
		}
		// Randomize users
		shuffleArray(users);
		io.to(gameCode).emit('chooseCountry', variables.countries, users);

		// async function getUserSelectedCountry() {
		// 	for (const user of users) {
		// 		let userSocket = io.sockets.connected[user.id];
		// 		await userSocket.emit('yourTurn', (countryId) => {
		// 			const choosenCountry = countriesLeft.map(item => item.id).indexOf(countryId);
		// 		});
		// 		console.log(choosenCountry);
		// 	}
		// }

		

		// for (let clientId in clients) {
		// 	let clientSocket = io.sockets.connected[clientId];
		// 	clientSocket.emit('chooseCountry');
		// }
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

function randName() {
	let username = '';
	const nameList = variables.nameList;
	username = nameList[Math.floor( Math.random() * nameList.length )];
	username += nameList[Math.floor( Math.random() * nameList.length )];
	if ( Math.random() > 0.5 ) {
		username += nameList[Math.floor( Math.random() * nameList.length )];
	}
	return username;
};

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}