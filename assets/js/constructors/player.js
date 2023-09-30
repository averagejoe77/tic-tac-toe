function Player(token, goesFirst) {
	this.token = token;
	this.moves = [];
	this.isMove = goesFirst;
	this.wins = (localStorage.getItem(`player${this.token}`) === null ? 0 : localStorage.getItem(`player${this.token}`));
	// this.updateWins();
	
	this.playerMove = function(sq, idx) {
		this.setToken(sq, this.token);
		this.isMove = false;
		this.moves.push(idx+1);
	}

	this.setToken = function(square,token) {
		if(square.children.length > 0) return;
		square.innerHTML = `<span class="text">${token}</span>`;
	}

	this.addWin = function() {
		this.wins++;
		localStorage.setItem(`player${this.token}` , this.wins);
		this.updateWins();
	}

	this.updateWins = function() {
		const plrWins = document.querySelector(`.player${this.token}-wins`);
		plrWins.innerHTML = this.wins;
	}

	this.resetScore = function() {
		localStorage.removeItem(`player${this.token}`);
		this.wins = 0;
		this.updateWins();
	}

	this.resetPlayer = function(move) {
		this.moves = [];
		this.isMove = move;
	}
}