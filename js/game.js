class Player {
	constructor(ejeX, ejeY, width, height) {
		this.ejeX = ejeX
		this.ejeY = ejeY
		this.width = width
		this.height = height
		this.speed = 10
		this.velocity_x = 0
		this.velocity_y = 0	
		this.jump = 50
		this.jumping = true
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
					this.velocity_y -= this.jump
					break;
			}
		}
	}
	update() {
		this.ejeX += this.velocity_x
		this.ejeY += this.velocity_y
	}
}