import ui from "/js/ui.js"

export default (function gameBoard() {
	let grid = []
	for (let i = 1; i <= 9; i++) {
		grid.push(null)
	}

	const getGrid = () => grid

	function draw(markType, position) {
		grid[position] = markType
		ui.drawInBox(position, markType)
	}

	function erase() {
		grid = grid.map(() => null)
		ui.eraseBoxes()
	}

	return { getGrid, draw, erase }
})()