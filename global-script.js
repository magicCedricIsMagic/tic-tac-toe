const game = (() => {

	const gameBoard = (() => {
		let grid = ["", "", "", "", "", "", "", "", ""]
		function draw(markType, position) {
			grid[position] = markType
			console.log("\n")
			console.log(`${grid[0]} ${grid[1]} ${grid[2]}`)
			console.log(`${grid[3]} ${grid[4]} ${grid[5]}`)
			console.log(`${grid[6]} ${grid[7]} ${grid[8]}`)
			console.log("\n")
		}
		return { grid, draw }
	})()


	function createPlayer(name, markType) {
		let score = 0
		return { name, markType, score }
	}
	const playerOne = createPlayer("Jean", "X")
	const playerTwo = createPlayer("Michel", "O")


	let turn = 0

	function isThereAWinner() {
		if (
			(!!gameBoard.grid[0] && gameBoard.grid[0] === gameBoard.grid[1] && gameBoard.grid[0] === gameBoard.grid[2])
			|| !!gameBoard.grid[3] && (gameBoard.grid[3] === gameBoard.grid[4] && gameBoard.grid[3] === gameBoard.grid[5])
			|| !!gameBoard.grid[6] && (gameBoard.grid[6] === gameBoard.grid[7] && gameBoard.grid[6] === gameBoard.grid[8])
			|| !!gameBoard.grid[0] && (gameBoard.grid[0] === gameBoard.grid[3] && gameBoard.grid[0] === gameBoard.grid[6])
			|| !!gameBoard.grid[1] && (gameBoard.grid[1] === gameBoard.grid[4] && gameBoard.grid[1] === gameBoard.grid[7])
			|| !!gameBoard.grid[2] && (gameBoard.grid[2] === gameBoard.grid[5] && gameBoard.grid[2] === gameBoard.grid[8])
			|| !!gameBoard.grid[0] && (gameBoard.grid[0] === gameBoard.grid[4] && gameBoard.grid[0] === gameBoard.grid[8])
			|| !!gameBoard.grid[2] && (gameBoard.grid[2] === gameBoard.grid[4] && gameBoard.grid[2] === gameBoard.grid[6])
		) {
			return true
		}
		else return false
	}
	
	let canPlay = true

	function play(position) {
		turn++
		const currentPlayer = turn % 2 !== 0 ? playerOne : playerTwo
		const nextPlayer = turn % 2 === 0 ? playerOne : playerTwo
		gameBoard.draw(
			currentPlayer.markType,
			position
		)
		if (isThereAWinner()) {
			console.log(`${currentPlayer.name} wins!`)
			currentPlayer.score++
			canPlay = false
		}
		else {
			if (turn === gameBoard.grid.length) {
				console.log(`Nobody wins :/`)
				canPlay = false
			}
			else {
				console.log(`Turn: ${nextPlayer.name}`)
			}
		}
		if (!canPlay) {
			console.log(`${playerOne.name}: ${playerOne.score}`)
			console.log(`${playerTwo.name}: ${playerTwo.score}`)
		}
	}

	return { play }
})()


/* game.play(0)
game.play(4)
game.play(3)
game.play(6)
game.play(2)
game.play(1)
game.play(8)
game.play(5)
game.play(7) */

game.play(4)
game.play(0)
game.play(2)
game.play(6)
game.play(5)
game.play(3)
