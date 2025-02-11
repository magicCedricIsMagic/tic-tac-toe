export default (function ui() {
	function getScores(playersOne, playersTwo) {
		return `${playersOne.name}: ${playersOne.score}\n${playersTwo.name}: ${playersTwo.score}`
	}
	return { getScores }
})()