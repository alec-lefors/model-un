self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('No Name Game').then(function(cache) {
			return cache.addAll([
				'/game',
				'/css/app.css',
				'/js/app.js',
				'/audio/beep.mp3',
				'/audio/boop.mp3',
				'/manifest.json',
				'/sw.js',
			]);
		})
	);
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
	let url = event.request.url.indexOf(self.location.origin) !== -1 ?
	event.request.url.split(`${self.location.origin}/`)[1] :
	event.request.url;

	event.respondWith(
		caches.open('No Name Game')
		.then(cache => {
			return cache.match(url)
			.then(response => {
				if (response) {
				return response;
				}
				throw Error('There is not response for such request', url);
			});
		})
		.catch(error => {
			return fetch(event.request);
		})
	);
  }
});