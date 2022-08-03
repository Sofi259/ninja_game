class World {
	constructor(canvas, width, height, player) {
		this.canvas = canvas
		this.canvas.width = width
		this.canvas.height = height
		this.ctx = this.canvas.getContext('2d')
		this.player = player
		this.gravity = 3
		this.friction = 0.9
		this.loadLevel()
	}
	loadLevel() {
		this.ctx.strokeStyle = 'black' //propiedad
		this.ctx.strokeRect(0,0, this.canvas.width, this.canvas.height) //método
	}
	playerCollision(player) {
		if (player.ejeX < 0) {
			player.ejeX = 0
			player.velocity_x = 0
		}
		else if ((player.ejeX + player.width) > this.canvas.width) {
			player.ejeX = this.canvas.width - this.player.width
			player.velocity_x = 0
		}
		else if (player.ejeY < 0) {
			player.ejeY = 0
			player.velocity_y = 0
		}
		else if ((player.ejeY + player.height) > this.canvas.height) {
			player.ejeY = this.canvas.height - this.player.height
			player.velocity_y = 0
		}
	}
	update() {
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
		this.loadLevel()
		this.player.velocity_y += this.gravity
		this.player.update()
		this.player.velocity_x *= this.friction
		this.player.velocity_y *= this.friction
		this.playerCollision(this.player)
		this.ctx.fillStyle = 'black'
		this.ctx.fillRect(this.player.ejeX, this.player.ejeY, this.player.width, this.player.height)
	}
}