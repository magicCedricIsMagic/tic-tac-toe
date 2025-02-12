import gameBoard from "/js/gameBoard.js"
import ui from "/js/ui.js"

export default (function game() {
	const players = []
	let canPlay = false
	let turn = 0

	function createPlayer(name, markType) {
		let score = 0
		return { name, markType, score }
	}

	function init(name1, name2) {
		players.push(
			createPlayer(name1, "X"),
			createPlayer(name2, "O")
		)
		canPlay = true
		ui.setPlayersNames(players)
		ui.updatePlayersScores(players)
		ui.displayMessage(`Turn: ${name1}`)
	}

	function getCurrentPlayer() {
		return turn % 2 !== 0 ? players[0] : players[1]
	}

	function getNextPlayer() {
		return turn % 2 === 0 ? players[0] : players[1]
	}

	function play(position) {
		if (canPlay) {
			const currentPlayer = getCurrentPlayer()
			const nextPlayer = getNextPlayer()
			turn++
			gameBoard.draw(
				currentPlayer.markType,
				position
			)
			if (checkForWin(currentPlayer.markType)) {
				ui.displayMessage(
					`${currentPlayer.name} wins!`,
					true,
					["success", "super"]
				)
				currentPlayer.score++
				ui.updatePlayersScores(players)
				canPlay = false
			}
			else {
				if (turn === gameBoard.getGrid().length) {
					ui.displayMessage(
						`Nobody wins :/`,
						true,
						["warning", "super"]
					)
					canPlay = false
				}
				else {
					ui.displayMessage(
						`Turn: ${nextPlayer.name}`,
						true,
						[turn % 2 !== 0 ? "secondary" : "primary"]
					)
				}
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

		gameBoard.getGrid().map((box, index) => {
			if (box === markType) checkedBoxes.push(index)
		})

		return (
			winningCombinations.some((wC) => (
				wC.every(box => checkedBoxes.includes(box))
			))
		)
	}

	function reset() {
		ui.displayMessage(`Turn: ${players[0].name}`)
		gameBoard.erase()
		turn = 0
		canPlay = true
	}

	return { init, play, canPlay, reset }
})()