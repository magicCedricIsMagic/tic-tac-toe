export default (function gameBoard() {
	let grid = ["", "", "", "", "", "", "", "", ""]

	function draw(markType, position) {
		grid[position] = markType
		console.log("---")
		console.log(`${grid[0]} ${grid[1]} ${grid[2]}`)
		console.log(`${grid[3]} ${grid[4]} ${grid[5]}`)
		console.log(`${grid[6]} ${grid[7]} ${grid[8]}`)
		console.log("---")
	}

	function erase() {
		grid = grid.map(() => "")
	}

	const getGrid = () => grid

	return { getGrid, draw, erase }
})()