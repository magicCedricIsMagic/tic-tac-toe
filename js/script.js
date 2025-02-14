import game from "/js/game.js"

game.init(
	prompt("Player one name") || "Player one",
	prompt("Player two name") || "Player two"
)
// game.init("Xavier", "Ophélie")