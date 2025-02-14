import gameBoard from "/js/gameBoard.js"
import ui from "/js/ui.js"

export default (function game() {
	let players, canPlay, turn, xFirst

	function getName(nbPlayerText) {
		let name = prompt(`Player ${nbPlayerText} name`) || ""
		if (!name.trim().length) name = `Player ${nbPlayerText}`
		return name
	}

	function createPlayer(name, markType) {
		let score = 0
		return { name, markType, score }
	}

	function init() {
		const name1 = getName("one")
		const name2 = getName("two")
		gameBoard.erase()
		players = []
		turn = 0
		xFirst = true
		players.push(
			createPlayer(name1, "X"),
			createPlayer(name2, "O")
		)
		canPlay = true
		ui.setPlayersNames(players)
		ui.updatePlayersScores(players)
		ui.setPlayersColors()
		ui.displayMessage(`Turn: ${name1}`)
	}

	function getCurrentPlayer() {
		return turn % 2 !== 0 ? players[Number(xFirst)] : players[Number(!xFirst)]
	}

	function getNextPlayer() {
		return turn % 2 === 0 ? players[Number(xFirst)] : players[Number(!xFirst)]
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
					[
						(players.findIndex(player => (
							player.markType === currentPlayer.markType
						))) === 0 
							? "primary" 
							: "secondary",
						"super",
					],
					true
				)
				currentPlayer.score++
				ui.updatePlayersScores(players)
				endRound()
			}
			else {
				if (turn === gameBoard.getGrid().length) {
					ui.displayMessage(
						`Nobody wins :/`,
						["gray", "super"],
						true
					)
					endRound()
				}
				else {
					ui.displayMessage(
						`Turn: ${nextPlayer.name}`,
						[(players.findIndex(player => player.markType === nextPlayer.markType)) === 0 ? "primary" : "secondary"],
					)
				}
			}
		}
	}

	function endRound() {
		xFirst = !xFirst
		canPlay = false
		ui.toggleGameButtons()
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
		ui.displayMessage(
			`Turn: ${players[Number(!xFirst)].name}`,
			[xFirst ? "primary" : "secondary"]
		)
		gameBoard.erase()
		turn = 0
		canPlay = true
	}

	return { init, play, canPlay, reset }
})()