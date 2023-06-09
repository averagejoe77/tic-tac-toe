document.addEventListener('DOMContentLoaded', function(evt) {
	let game = new Game();
	game.start();
	const restBtn = document.querySelector('.reset');
	restBtn.addEventListener('click', () => {
		game.resetScore();
	});
	const newBtn = document.querySelector('.new');
	newBtn.addEventListener('click', () => {
		game.restart();
	});
});