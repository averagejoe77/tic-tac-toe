function Game() {
	this.winningCombos = [
		[1,2,3],
		[4,5,6],
		[7,8,9],
		[1,4,7],
		[2,5,8],
		[3,6,9],
		[1,5,9],
		[3,5,7]
	];
	this.squares = document.querySelectorAll('.square');
	this.playerX = new Player('X', true);
	this.playerO = new Player('O', false);
	this.playerX.updateWins();
	this.playerO.updateWins();
	this.controller = new AbortController();
	this.messageContainer = document.querySelector('.messages');
	this.messageContainer.innerHTML = '';
	this.ties = 0;
	this.newBtn = document.querySelector('.new');
	this.start = function() {
		if(this.controller.signal.aborted) {
			this.controller = new AbortController();
		}
		this.squares.forEach((square, idx) => {
			square.addEventListener('click', function() { 
				this.moveListener(square, idx);
			}.bind(this), {once:true, signal: this.controller.signal});
		});
	}
	this.moveListener = function(square, idx) {
		if(this.playerX.isMove) {
			this.playerX.playerMove(square, idx);
			this.checkResults(this.playerX, this.winningCombos);
			this.playerO.isMove = true;
		} else {
			this.playerO.playerMove(square, idx);
			this.checkResults(this.playerO, this.winningCombos);
			this.playerX.isMove = true;
		}
	}
	this.checkResults = function(player, combos) {
		let match = false;
		let moves = player.moves;
		moves.sort();
		for(let i = 0; i < combos.length; i++) {
			if(moves.length >= combos[i].length) {
				match = combos[i].every((element) => moves.includes(element));
				if(match) {
					this.endGame(player, false);
					break;
				}
			}
		};
		if(!match) {
			let tie = this.checkForTie();
			if(tie) {
				this.endGame(player, tie);
			}
		}

		return match;
	}
	this.checkForTie = function() {
		let totalMoves = this.playerX.moves.length + this.playerO.moves.length;
		if(totalMoves === 9) {
			this.ties++;
			return true;
		}

		return false;
	}

	this.endGame = function(player, isTie) {
		this.controller.abort();
		if(isTie) {
			this.displayMsg(`Game Over. No player has won, the game is a tie.`);
		} else {
			this.displayMsg(`Game Over. Player ${player.token} has won the game.`);
			player.addWin();
		}
		this.newBtn.classList.add('show');
	}

	this.restart = function() {
		this.newBtn.classList.remove('show');
		this.squares.forEach(function(square, idx) {
			if(square.children.length !== 0) {
				square.removeChild(square.firstChild);
			}
		});
		this.playerX.resetPlayer(true);
		this.playerO.resetPlayer(false);
		this.messageContainer.innerHTML = '';
		this.start();
	}

	this.resetScore = function() {
		this.playerO.resetScore();
		this.playerX.resetScore();
		this.displayMsg('The scores have been reset.');
		setTimeout(() => {
			this.messageContainer.innerHTML = '';
		}, 3350);
	}

	this.displayMsg = function(message) {
		let msg = document.createElement('p');
		msg.textContent = message;
		this.messageContainer.appendChild(msg);
		setTimeout(() => {
			msg.classList.toggle('fade');
		}, 3000)
	}
}
