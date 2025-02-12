import { getRandomInt } from "/js/utils.js"
import game from "/js/game.js"

export default (function ui() {
	const _playerAreas = document.querySelectorAll(".player-area")
	const _boxes = document.querySelectorAll(".box")
	const _gameButtons = document.querySelector(".game-buttons")
	const _newRoundButton = document.querySelector(".button.new-round")
	const _changePlayersButton = document.querySelector(".button.change-players")
	const _alert = document.querySelector(".alert")
	let timeoutMessage
	
	function setPlayersNames(players) {
		players.map((player, index) => {
			_playerAreas[index].querySelector(".player__name").textContent = player.name
			_playerAreas[index].querySelector(".player__mark-type").textContent = player.markType
		})
	}

	function setPlayersColors() {
		const primaryChroma = getRandomInt(360)
		document.querySelector(":root").style.setProperty("--col-primary", `oklch(60% 0.2 ${primaryChroma})`)
		document.querySelector(":root").style.setProperty("--col-secondary", `oklch(60% 0.2 ${primaryChroma + 360 / 2})`)
	}

	function updatePlayersScores(players) {
		players.map((player, index) => {
			console.log({player})
			_playerAreas[index].querySelector(".player__score").textContent = player.score
		})
	}

	function drawInBox(boxId, markType) {
		const _box = document.querySelector(`.box[data-box-index="${boxId}"]`)
		_box.textContent = markType
		_box.style.setProperty("--col-box", markType === "X" ? "var(--col-primary)" : "var(--col-secondary)")
	}

	function eraseBoxes() {
		for (let _box of _boxes) {
			_box.textContent = ""
			_box.style.setProperty("--col-box", "var(--col-gray)")
		}
	}

	function displayMessage(message, classList=["primary"], autohide) {
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

	function toggleGameButtons() {
		_gameButtons.hasAttribute("hidden")
			? _gameButtons.removeAttribute("hidden")
			: _gameButtons.setAttribute("hidden", true)
	}

	function hideMessage() {
		_alert.classList.add("hidden")
	}

	for (let _box of _boxes) {
		_box.addEventListener("click", (e) => {
			if (!_box.textContent) {
				game.play(e.target.dataset.boxIndex)
			}
		})
	}

	_alert.addEventListener("click", (e) => {
		hideMessage()
	})

	_newRoundButton.addEventListener("click", () => {
		game.reset()
		toggleGameButtons()
	})

	_changePlayersButton.addEventListener("click", () => {
		game.init(prompt("Player one name"), prompt("Player two name"))
		toggleGameButtons()
	})

	return { setPlayersNames, setPlayersColors, updatePlayersScores, drawInBox, eraseBoxes, displayMessage, hideMessage, toggleGameButtons }
})()