const canvas = document.getElementById('canvas')
let player = new Player(50, 600, 72, 72)
let display = new World(canvas, 1200, 800, player)
let update = function() {
	display.update()
}

let engine = new Engine(1000/30, update)

document.addEventListener('keydown', (ev) => {
	display.player.getInput(ev)
})
document.addEventListener('keyup', (ev) => {
	display.player.getInput(ev)
})

engine.start()