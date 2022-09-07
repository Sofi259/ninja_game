const canvas = document.getElementById('canvas')
let player = new Player(50, 600, 72, 72)
let display = new World(canvas, 1200, 450, player)
let update = function() {
	display.update()
}
let startGame = async function(){
	let response = await fetch('assets/levels/nivel_0.json')
	let lvl = await response.json()
	console.log(lvl);
	display.loadLevel(lvl);

	engine.start()
}

let engine = new Engine(1000/30, update)

document.addEventListener('keydown', (ev) => {
	display.player.getInput(ev)
})
document.addEventListener('keyup', (ev) => {
	display.player.getInput(ev)
})

startGame()