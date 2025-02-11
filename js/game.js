import gameBoard from "/js/gameBoard.js"
import ui from "/js/ui.js"

export default (function game() {
	let canPlay = false
	let turn = 0

	const players = []
	function createPlayer(name, markType) {
		let score = 0
		return { name, markType, score }
	}

	function init(name1, name2) {
		players.push(
			createPlayer(name1, "X"),
			createPlayer(name2, "O")
		)
		console.log({ players })
		canPlay = true
	}

	function getCurrentPlayer() {
		return turn % 2 !== 0 ? players[0] : players[1]
	}
	function getNextPlayer() {
		return turn % 2 === 0 ? players[0] : players[1]
	}

	function play(position) {
		if (canPlay) {
			turn++
			const currentPlayer = getCurrentPlayer()
			const nextPlayer = getNextPlayer()
			gameBoard.draw(
				currentPlayer.markType,
				position
			)
			if (checkForWin(currentPlayer.markType)) {
				console.log(`${currentPlayer.name} wins!`)
				currentPlayer.score++
				canPlay = false
			}
			else {
				if (turn === gameBoard.getGrid().length) {
					console.log(`Nobody wins :/`)
					canPlay = false
				}
				else {
					console.log(`Turn: ${nextPlayer.name}`)
				}
			}
			if (!canPlay) {
				console.log(ui.getScores(players[0], players[1]))
			}
		}
	}

	function checkForWin(markType) {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		let checkedBoxes = []
		console.log("gameBoard.getGrid()", gameBoard.getGrid())
		gameBoard.getGrid().map((box, index) => {
			if (box === markType) checkedBoxes.push(index)
		})

		return winningCombinations.some((wC) => (
			wC.every(box => checkedBoxes.includes(box))
		))
	}

	function reset() {
		console.log("RESET")
		gameBoard.erase()
		turn = 0
		canPlay = true
		console.log("gameBoard.getGrid()", gameBoard.getGrid())
	}

	return { init, play, canPlay, reset }
})()