export default (function gameBoard() {
	let grid = ["", "", "", "", "", "", "", "", ""]
	function draw(markType, position) {
		grid[position] = markType
	}
	return { grid, draw }
})()