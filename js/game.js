class Player {
	constructor(ejeX, ejeY, width, height) {
		this.ejeX = ejeX
		this.ejeY = ejeY
		this.width = width
		this.height = height
		this.speed = 5
		this.velocity_x = 0
		this.velocity_y = 0	
		this.jump = 50
		this.jumping = true
		this.animationImage = new Image()
		this.animationImage.src = 'assets/blue_spritesheet.png'
		this.animationFrames = [
			new Frame(0, 0, 72, 72), new Frame(72, 0, 72, 72), new Frame(144, 0, 72, 72), new Frame(216, 0, 72, 72), new Frame(288, 0, 72, 72), new Frame(360, 0, 72, 72), //mirando derecha
			new Frame(0, 72, 72, 72), new Frame(72, 72, 72, 72), new Frame(144, 72, 72, 72), new Frame(216, 72, 72, 72), new Frame(288, 72, 72, 72), new Frame(360, 72, 72, 72), //caminando derecha
			new Frame(0, 144, 72, 72), new Frame(72, 144, 72, 72), new Frame(144, 144, 72, 72), new Frame(216, 144, 72, 72), new Frame(288, 144, 72, 72), //saltando derecha
			new Frame(0, 216, 72, 72), new Frame(72, 216, 72, 72), new Frame(144, 216, 72, 72), new Frame(216, 216, 72, 72), new Frame(288, 216, 72, 72), //cayendo derecha
		]
		this.animationFrameSet = {

		    // "idle-left" : [0],
		    // "jump-left" : [1],
		    // "move-left" : [2, 3, 4, 5],
		    "idle-right": [0, 1, 2, 3, 4, 5],
		    "move-right": [6, 7, 8, 9, 10, 11],
		    "jump-right": [12, 13, 14, 15, 16]
		  }
		this.actualAnimationFrameSet = this.animationFrameSet["idle-right"]
	}
	movePlayer(e) {
		if (e.type == 'keydown') {
			switch (e.keyCode) {
				case 37:
					this.velocity_x -= this.speed
					break;
				case 39:
					this.velocity_x += this.speed
					break;
				case 32:
					if (!this.jumping) {
						this.velocity_y -= this.jump
						this.jumping = true
					}
					break;
			}
		}
	}
	update() {
		this.ejeX += this.velocity_x
		this.ejeY += this.velocity_y
	}
}

class Frame {
	constructor(x, y, width, height){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}
}