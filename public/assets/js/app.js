// Main Menu JS

// Disable right click
document.addEventListener('contextmenu', event => event.preventDefault());

class Notification {
	constructor(title, message) {
		Notification.closeImmediately();
		document.body.insertAdjacentHTML('afterbegin',
			`<div class="notification">
				<div>
					<h1>${title}</h1>
					<h3>${message}</h3>
					<button onclick="Notification.close();">Close</button>
				</div>
			</div>`
		);
		setTimeout(() => {
			const notifications = document.querySelectorAll('.notification');
			notifications.forEach((notification) => {
				notification.classList.add('show');
			});
		}, 200);
	}

	static close() {
		const notifications = document.querySelectorAll('.notification');
		notifications.forEach((notification) => {
			notification.classList.remove('show');
			setTimeout(() => {
				notification.remove();
			}, 500);
		});
	}

	static closeImmediately() {
		const notifications = document.querySelectorAll('.notification');
		notifications.forEach((notification) => {
			notification.remove();
		});
	}
}

// Full screen
function toggleFullscreen() {
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		if (document.documentElement.requestFullScreen) {  
			document.documentElement.requestFullScreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullScreen) {
			document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}

const links = document.querySelectorAll('[data-link]');
let currentMenu = document.querySelector('.active');
let focusedLink = 0;
let menuLinks = currentMenu.querySelectorAll('[data-link]');

function toggleIndexes(on = true) {
	links.forEach( (link) => {
		link.tabIndex = on ? 1 : -1;
		link.blur();
	});
}

toggleIndexes(true);

links.forEach( (link) => {
	link.addEventListener("click", linkTheLinks);
});

function linkTheLinks() {
	const menuName = this.getAttribute('data-link');
	if(menuName == '') return;
	goToWindow(menuName, this);
}

function goToWindow(menuName, link) {
	const showMenu = document.querySelector(`[data-menu=${menuName}]`);
	showMenu.classList.remove('inactive');
	showMenu.classList.add('active');
	currentMenu = showMenu;
	menuLinks = currentMenu.querySelectorAll('[data-link]');
	link.parentNode.classList.add('inactive');
	link.parentNode.classList.remove('active');
	focusedLink = 0;
}

function lockMultiplayerMenus(status) {
	const onlineLinks = document.querySelectorAll('.online');
	onlineLinks.forEach((link) => {
		if(status) {
			link.classList.add('locked');
			link.removeEventListener("click", linkTheLinks);
		}
		if(!status) {
			link.addEventListener("click", linkTheLinks);
			link.classList.remove('locked');
		}
	});
}

function backToMainMenu() {
	document.querySelector('.main-menu').classList.remove('hide');
	document.querySelector('.game').classList.remove('show');
}

// Navigate with keyboard
function enterKeyPressed() {
	const currentElemName = document.activeElement.tagName.toLowerCase();
	if(currentElemName == 'input' || currentElemName == 'div') return;
	menuLinks[focusedLink].click();
	// if(menuLinks[focusedLink].hasAttribute('onclick')) {
	// 	return;
	// }
	if(document.activeElement != document.querySelector('body')) {
		menuLinks[0].focus();
	}
}

function escapeKeyPressed() {
	const backButton = currentMenu.querySelector('.back');
	backButton.click();
	if(document.activeElement != document.querySelector('body')) {
		menuLinks[0].focus();
	}
}

function upArrowPressed() {
	focusedLink = focusedLink - 1;
	focusedLink = focusedLink.mod(menuLinks.length);
	menuLinks[focusedLink].focus();
}

function downArrowPressed() {
	focusedLink = (focusedLink + 1);
	focusedLink = focusedLink.mod(menuLinks.length);
	menuLinks[focusedLink].focus();
}

function leftArrowPressed() {
	 console.log('left');
}

function rightArrowPressed() {
	 console.log('right');
}

// document.addEventListener('keydown', navigateMenus);
// function navigateMenus(evt) {
// 	menuLinks = currentMenu.querySelectorAll('[data-link]');
// 	evt = evt || window.event;
// 	if(document.activeElement == document.querySelector('body')) {
// 		menuLinks[focusedLink].focus();
// 		return;
// 	}
// 	switch (evt.keyCode) {
// 	case 37:
// 		leftArrowPressed();
// 		break;
// 	case 38:
// 		upArrowPressed();
// 		break;
// 	case 39:
// 		rightArrowPressed();
// 		break;
// 	case 40:
// 		downArrowPressed();
// 		break;
// 	case 13:
// 		enterKeyPressed();
// 		break;
// 	case 27:
// 		escapeKeyPressed();
// 		break;
// 	}
// };

Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}

async function inputDialog() {
	return new Promise( (resolve, reject) => {
		// document.removeEventListener('keydown', navigateMenus);
		toggleIndexes(false);
		const dialog = document.querySelector('.inputDialog');
		dialog.classList.remove('hidden');
		const textInput = dialog.querySelector('input[type="text"]');
		textInput.tabIndex = 1;
		textInput.focus();
		const form = dialog.querySelector('form');
		let input = '';
		form.addEventListener('submit', inputListener);
		function inputListener(e) {
			e.preventDefault();
			input = textInput.value;
			textInput.value = '';
			dialog.classList.add('hidden');
			form.removeEventListener('submit', inputListener);
			// document.addEventListener('keydown', navigateMenus);
			if(!input) {
				reject();
			} else {
				resolve(input);
			}
		}
	});
}

// Socket IO Functions

let inLobby = false;
let username = '';
let id = '';

if(typeof io === 'undefined') {
	new Notification('Whoops!', 'You are playing offline. Please restore an internet connection.');
	backToMainMenu();
	lockMultiplayerMenus(true);
}
let socket = io.connect();

socket.on('disconnect', () => {
	new Notification('Whoops!', 'Disconnected from server.');
	if (currentMenu.dataset.menu != 'main') {
		goToWindow('main', currentMenu.querySelectorAll('[data-link]')[0]);
	}
	backToMainMenu();
	lockMultiplayerMenus(true);
	clearTimer();
	socket.on('connect', () => {
		new Notification('Back online!', 'Connected to server.');
		lockMultiplayerMenus(false);
	});
});

socket.on('username', (data) => {
	username = data.username;
	id = data.id;
	document.querySelector('.players').innerHTML = `<li class="item">${username}</li>`;
});

socket.on('playerCount', (data) => {
	document.querySelector('[data-socket="playerCount"]').innerHTML = data;
});

socket.on('currentUsers', (users) => {
	document.querySelector('.partyCount').innerHTML = users.length;
	const playerBoard = document.querySelector('.players');
	html = '';
	users.forEach((user) => {
		html += `<li class="item">${user}</li>`;
	});
	playerBoard.innerHTML = html;
});

function createGame() {
	socket.emit('createGame', '', (data) => {
		document.querySelector('[data-socket="code"]').innerHTML = data;
	});
	inLobby = true;
}

socket.on('gameDisbanded', (msg) => {
	currentMenu.querySelector('.back').click();
	clearLobby();
	backToMainMenu();
	new Notification('Sorry!', msg);
});

function joinGame(roomCode, link) {
	socket.emit('joinGame', roomCode, (data) => {
		if(data.success) {
			goToWindow('lobby', link);
			inLobby = true;
		} else {
			new Notification('Sorry!', data.error.msg);
		}
	});
}

function leaveLobby() {
	socket.emit('leaveLobby');
	clearLobby();
}

function disband(link) {
	socket.emit('disband', '', (data) => {
		if(data.success) {
			goToWindow('multiplayer', link);
			clearLobby();
		} else {
			new Notification('Sorry!', data.error.msg);
		}
	});
}

function clearLobby() {
	document.querySelector('.players').innerHTML = `<li class="item">${username}</li>`;
	document.querySelector('.partyCount').innerHTML = 1;
	inLobby = false;
	clearTimer();
}

function clearTimer() {
	document.querySelectorAll('.timer').forEach( (elem) => {
		elem.innerHTML = ``;
	});
}

function enterCode(elem) {
	inputDialog()
		.then((code) => submitCode(code))
		.catch((error) => noCode(error));
	function submitCode(code) {
		elem.innerHTML = `Enter code: ${code.toUpperCase()}`;
		const joinGame = elem.parentNode.querySelector('.join-game');
		joinGame.classList.remove('locked');
		joinGame.setAttribute('onclick', `joinGame('${code}', this)`);
	}
	function noCode(error) {
		elem.innerHTML = `Enter code:`;
		const joinGame = elem.parentNode.querySelector('.join-game');
		joinGame.classList.add('locked');
		joinGame.setAttribute('onclick', ``);
	}
};

function startGame() {
	socket.emit('start game');
}

socket.on('start game', (callback) => {
	let seconds = 5;
	const counter = setInterval(timer, 1000);
	var beep = new Audio('/audio/beep.mp3');
	var boop = new Audio('/audio/boop.mp3');
	function timer() {
		if(!inLobby) {
			clearInterval(counter);
			callback(false);
			return;
		}
		seconds = seconds - 1;
		if(seconds <= 3 && seconds > 0) {
			beep.play();
		}
		document.querySelectorAll('.timer').forEach( (elem) => {
			elem.innerHTML = `00:0${seconds}`;
		});
		if (seconds <= 0) {
			clearInterval(counter);
			boop.play();
			callback(true);
			return;
		}
	}
});

socket.on('chooseCountry', (countries, players) => {
	document.querySelector('.main-menu').classList.add('hide');
	const gameScreen = document.querySelector('.game');
	gameScreen.classList.add('show');
	const countrySelect = gameScreen.querySelector('.countrySelect');
	const nationScreen = gameScreen.querySelector('.nations');
	const playerScreen = countrySelect.querySelector('.players');
	playerScreen.innerHTML = '';
	console.log(players);
	players.forEach((player) => {
		if (player.id == id) {
			playerScreen.insertAdjacentHTML('afterbegin',
				`<li class="me">
					<h2>${player.name}</h2>
					<div class="countries"></div>
				</li>`
			);
		} else {
			playerScreen.insertAdjacentHTML('afterbegin',
				`<li class="otherUser">${player.name}</li>`
			);
		}
	});
	const nationPicker = playerScreen.querySelector('.countries');
	nationPicker.innerHTML = '';
	nationScreen.innerHTML = `
		<ul class="nation active">
			<li class="nation-name">Nation Select</li>
			<li class="nation-desc">Choose a nation to lead. Every nation has unique stats for your perferred playstyle.</li>
		</ul>
	`;
	countries.forEach((country) => {
		nationPicker.insertAdjacentHTML("beforeend",
			`<div data-nationid="${country.id}">${country.name}</div>`
		);
		nationScreen.insertAdjacentHTML("beforeend", 
			`<ul class="nation inactive" data-nation="${country.id}">
				<li class="thumbnail"></li>
				<li class="nation-name">${country.name}</li>
				<li class="nation-desc">${country.description}</li>
				<li class="nation-stats">
					<div>Money: +${country.gains.money}</div>
					<div>Military: +${country.gains.military}</div>
					<div>Humanitarian: +${country.gains.humanitarian}</div>
					<div>Inteligence: +${country.gains.intel}</div>
					<div>Materials: +${country.gains.material}</div>
				</li>
				<li class="nation-confirm">Confirm</li>
			</ul>`
		);
	});

	const nationLinks = nationPicker.querySelectorAll('[data-nationid]');

	nationLinks.forEach( (link) => {
		link.addEventListener("click", (event) => {
			const nationId = event.target.dataset.nationid;
			if(nationId == '') return;
			goToNation(nationId);
		});
	});

	function goToNation(nationId) {
		const nationMenus = nationScreen.querySelectorAll('.nation');
		nationMenus.forEach((nationMenu) => {
			nationMenu.classList.add('inactive');
			nationMenu.classList.remove('active');
		});
		const currentNationMenu = document.querySelector(`[data-nation='${nationId}']`);
		currentNationMenu.classList.remove('inactive');
		currentNationMenu.classList.add('active');
	}

});
