class Player {
	constructor(token, goesFirst) {
		this.token = token;
		this.moves = [];
		this.isMove = goesFirst;
		this.wins = (localStorage.getItem(`player${this.token}`) === null ? 0 : localStorage.getItem(`player${this.token}`));
		this.updateWins();
	}

	playerMove(sq, idx) {
		this.setToken(sq, this.token);
		this.isMove = false;
		this.moves.push(idx+1);
	}

	setToken(square,token) {
		if(square.children.length > 0) return;
		square.innerHTML = `<span class="text">${token}</span>`;
	}

	addWin() {
		this.wins++;
		localStorage.setItem(`player${this.token}` , this.wins);
		this.updateWins();
	}

	updateWins() {
		const plrWins = document.querySelector(`.player${this.token}-wins`);
		plrWins.innerHTML = this.wins;
	}

	resetScore() {
		localStorage.removeItem(`player${this.token}`);
		this.wins = 0;
		this.updateWins();
	}

	resetPlayer(move) {
		this.moves = [];
		this.isMove = move;
	}
}