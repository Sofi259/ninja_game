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
			player.jumping = false
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


		let AfsIndex = this.player.actualAnimationFrameSet[0]
		let aFrame = this.player.animationFrames[AfsIndex]
		let sx = aFrame.x
		let sy = aFrame.y
		let sFrameSize = 72
		let dx = this.player.ejeX
		let dy = this.player.ejeY
		this.ctx.drawImage(this.player.animationImage, sx, sy, sFrameSize, sFrameSize, dx, dy, sFrameSize, sFrameSize)
	}

// TODAVIA NO LAS PUDE HACER ANDAR - ES PARA HACER LA ANIMACION

// 	animator(animationFrameSet, delay) {
// 	  this.count = 0
// 	  this.delay = (delay >= 1) ? delay : 1
// 	  this.animationFrameSet = animationFrameSet
// 	  this.frameIndex = 0
// 	  this.frameValue = animationFrameSet[0]
// 	  this.mode = "pause"
// 	}
// 	animate() {
// 		switch(this.mode) {
// 			case "loop" : this.loop()
// 			break;
// 			case "pause" :
// 			break;
// 		}
// 	}
// 	changeFrameSet(animationFrameSet, mode, delay = 10, frameIndex = 0) {
// 		if(this.animationFrameSet === animationFrameSet) { return; }

// 		this.count = 0
// 	  	this.delay = delay
// 	  	this.animationFrameSet = animationFrameSet
// 	  	this.frameIndex = frameIndex
// 	  	this.frameValue = frameValue[frameIndex]
// 	  	this.mode = mode
// 	}
// 	loop() {
// 		this.count ++

// 		while(this.count > this.delay) {
// 			this.count -= this.delay
// 			this.frameIndex = (this.frameIndex < this.animationFrameSet.length - 1) ? this.frameIndex + 1 : 0
// 			this.frameValue = this.animationFrameSet[this.frameIndex]
// 		}
// 	}
}