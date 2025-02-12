import ui from "/js/ui.js"

export default (function gameBoard() {
	let grid = ["", "", "", "", "", "", "", "", ""]

	function draw(markType, position) {
		grid[position] = markType
		ui.drawInBox(position, markType)
	}

	function erase() {
		grid = grid.map(() => "")
		grid.map((box, index) => {
			ui.drawInBox(index, "")
		})
	}

	const getGrid = () => grid

	return { getGrid, draw, erase }
})()