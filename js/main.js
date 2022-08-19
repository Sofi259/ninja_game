const canvas = document.getElementById('canvas')
let player = new Player(50, 600, 30, 60)
let display = new World(canvas, 1200, 800, player)
let update = function() {
	display.update()
}

let engine = new Engine(1000/30, update)

document.addEventListener('keydown', (ev) => {
	display.player.movePlayer(ev)
})

engine.start()
console.log("osfdkñ")