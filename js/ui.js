import game from "/js/game.js"

export default (function ui() {
	const _playerAreas = document.querySelectorAll(".player-area")

	function setPlayersNames(players) {
		players.map((player, index) => {
			_playerAreas[index].querySelector(".player__name").textContent = player.name
			_playerAreas[index].querySelector(".player__mark-type").textContent = player.markType
		})
	}
	function updatePlayersScores(players) {
		players.map((player, index) => {
			console.log({player})
			_playerAreas[index].querySelector(".player__score").textContent = player.score
		})
	}

	const _boxes = document.querySelectorAll(".box")
	for (let _box of _boxes) {
		_box.addEventListener("click", (e) => {
			if (!_box.textContent) {
				game.play(e.target.dataset.boxIndex)
			}
		})
	}

	function drawInBox(boxId, markType) {
		const _box = document.querySelector(`.box[data-box-index="${boxId}"]`)
		_box.textContent = markType
	}

	const _alert = document.querySelector(".alert")

	let timeoutMessage
	function displayMessage(message, autohide = true, classList=["primary"]) {
		clearTimeout(timeoutMessage)
		_alert.textContent = message
		_alert.classList = `alert`
		classList.map(className => _alert.classList.add(`alert--${className}`))

		if (!!autohide) {
			timeoutMessage = setTimeout(() => {
				_alert.classList.add("hidden")
			}, typeof(autohide) === "number" ? autohide : 2000)
		}
	}

	function hideMessage() {
		_alert.classList.add("hidden")
	}

	_alert.addEventListener("click", (e) => {
		hideMessage()
	})

	const _resetButton = document.querySelector(".reset")
	_resetButton.addEventListener("click", () => {
		game.reset()
	})

	return { setPlayersNames, updatePlayersScores, drawInBox, displayMessage, hideMessage }
})()