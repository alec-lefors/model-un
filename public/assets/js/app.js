let socket = io.connect();
// Disable right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Full screen
function fullScreen() {
	const docElem = document.documentElement;
	if (docElem.requestFullscreen) {
		docElem.requestFullscreen();
	} else if (docElem.mozRequestFullScreen) { /* Firefox */
		docElem.mozRequestFullScreen();
	} else if (docElem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		docElem.webkitRequestFullscreen();
	} else if (docElem.msRequestFullscreen) { /* IE/Edge */
		docElem.msRequestFullscreen();
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
	menuLinks[focusedLink].click();
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