function Player(token, goesFirst) {
	this.token = token;
	this.moves = [];
	this.isMove = goesFirst;
	this.wins = (localStorage.getItem(`player${this.token}`) === null ? 0 : localStorage.getItem(`player${this.token}`));
	this.updateWins();
}
Player.prototype.playerMove = function(sq, idx) {
	this.setToken(sq, this.token);
	this.isMove = false;
	this.moves.push(idx+1);
}

Player.prototype.setToken = function(square,token) {
	if(square.children.length > 0) return;
	square.innerHTML = `<span class="text">${token}</span>`;
}

Player.prototype.addWin = function() {
	this.wins++;
	localStorage.setItem(`player${this.token}` , this.wins);
	this.updateWins();
}

Player.prototype.updateWins = function() {
	const plrWins = document.querySelector(`.player${this.token}-wins`);
	plrWins.innerHTML = this.wins;
}

Player.prototype.resetScore = function() {
	localStorage.removeItem(`player${this.token}`);
	this.wins = 0;
	this.updateWins();
}

Player.prototype.resetPlayer = function(move) {
	this.moves = [];
	this.isMove = move;
}