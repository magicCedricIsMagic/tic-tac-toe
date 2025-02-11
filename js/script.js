import game from "/js/game.js"

game.init("Jean", "Michel")

const _boxes = document.querySelectorAll(".box")
for (let _box of _boxes) {
	_box.addEventListener("click", (e) => {
		game.play(e.target.dataset.boxIndex)
	})
}

const _resetButton = document.querySelector(".reset")
_resetButton.addEventListener("click", () => {
	game.reset()
})