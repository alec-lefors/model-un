// Main Menu JS

// Disable right click
document.addEventListener('contextmenu', event => event.preventDefault());

const fullscreen = false;
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

links.forEach( (link) => {
	link.tabIndex = 1;
	link.addEventListener("click", () => {
	const menuName = link.getAttribute('data-link');
	if(menuName == '') return;
	const showMenu = document.querySelector(`[data-menu=${menuName}]`);
	showMenu.classList.remove('inactive');
	showMenu.classList.add('active');
	currentMenu = showMenu;
	menuLinks = currentMenu.querySelectorAll('[data-link]');
	link.parentNode.classList.add('inactive');
	link.parentNode.classList.remove('active');
	focusedLink = 0;
	});
});

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

document.onkeydown = function(evt) {
	menuLinks = currentMenu.querySelectorAll('[data-link]');
	evt = evt || window.event;
	if(document.activeElement == document.querySelector('body')) {
		menuLinks[focusedLink].focus();
		return;
	}
	switch (evt.keyCode) {
	case 37:
		leftArrowPressed();
		break;
	case 38:
		upArrowPressed();
		break;
	case 39:
		rightArrowPressed();
		break;
	case 40:
		downArrowPressed();
		break;
	case 13:
		enterKeyPressed();
		break;
	case 27:
		escapeKeyPressed();
		break;
	}
};

Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}

// Socket IO Functions

let socket = io.connect();

socket.on('playerCount', (data) => {
	document.querySelector('[data-socket="playerCount"]').innerHTML = data;
});

function createGame() {
	socket.emit('createGame', '', (data) => {
		document.querySelector('[data-socket="code"]').innerHTML = data;
	});
}

function joinGame(code) {
	socket.emit('joinGame', code, (data) => {
		if(data.success) {
			console.log(data.success.msg);
		} else {
			console.log(data.error.msg);
		}
	});
}

function inputDialog() {
	return new Promise( (resolve, reject) => {
		const dialog = document.querySelector('.inputDialog');
		dialog.classList.remove('hidden');
		const textInput = dialog.querySelector('input[type="text"]');
		textInput.tabIndex = -1;
		textInput.focus();
		const form = dialog.querySelector('form');
		let input = '';
		form.addEventListener('submit', inputListener);
		function inputListener(e) {
			e.preventDefault();
			input = textInput.value;
			textInput.value = '';
			dialog.classList.add('hidden');
			if(!input) {
				const reason = new Error('Empty input');
				reject();
			} else {
				resolve(input);
			}
			form.removeEventListener('submit', inputListener);
		}
	});
}

function enterCode(elem) {
	inputDialog().then((code) => submitCode(code))
	.catch((error) => noCode(error));
	function submitCode(code) {
		elem.innerHTML = `Enter code: ${code}`;
		const joinGame = elem.parentNode.querySelector('.join-game');
		joinGame.classList.remove('locked');
		joinGame.setAttribute('onclick', `joinGame('${code}')`);
	}
	function noCode(error) {
		elem.innerHTML = `Enter code:`;
		const joinGame = elem.parentNode.querySelector('.join-game');
		joinGame.classList.add('locked');
		joinGame.setAttribute('onclick', ``);
	}
};