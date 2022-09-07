class Player {
	constructor(ejeX, ejeY, width, height) {
		this.ejeX = ejeX
		this.ejeY = ejeY
		this.prev_ejeX = ejeX
		this.prev_ejeY = ejeY
		this.width = width
		this.height = height

		this.left = {active:false, down:false}
		this.right = {active:false, down:false}
		this.up = {active:false, down:false}

		this.speed = 3
		this.velocity_x = 0
		this.velocity_y = 0
		this.jump = 50
		this.jumping = true

		this.animationCount = 0
		this.animationDelay = 6
		this.animationImage = new Image()
		this.animationImage.src = 'assets/ninjas-1-sheet.png'
		this.animationFrames = [
			new Frame(0, 0, 72, 72), new Frame(72, 0, 72, 72), new Frame(144, 0, 72, 72), new Frame(216, 0, 72, 72), new Frame(288, 0, 72, 72), //mirando derecha
			new Frame(0, 72, 72, 72), new Frame(72, 72, 72, 72), new Frame(144, 72, 72, 72), new Frame(216, 72, 72, 72), new Frame(288, 72, 72, 72), new Frame(360, 72, 72, 72), new Frame(432, 72, 72, 72), //caminando derecha
			new Frame(0, 144, 72, 72), new Frame(72, 144, 72, 72), new Frame(144, 144, 72, 72), new Frame(216, 144, 72, 72), new Frame(288, 144, 72, 72), //saltando derecha
			new Frame(0, 216, 72, 72), new Frame(72, 216, 72, 72), new Frame(144, 216, 72, 72), new Frame(216, 216, 72, 72), new Frame(288, 216, 72, 72), //cayendo derecha
			new Frame(0, 288, 72, 72), new Frame(72, 288, 72, 72), new Frame(144, 288, 72, 72), //aterrizando derecha

			new Frame(0, 360, 72, 72), new Frame(72, 360, 72, 72), new Frame(144, 360, 72, 72), new Frame(216, 360, 72, 72), new Frame(288, 360, 72, 72), //mirando izquierda
			new Frame(0, 432, 72, 72), new Frame(72, 432, 72, 72), new Frame(144, 432, 72, 72), new Frame(216, 432, 72, 72), new Frame(288, 432, 72, 72), new Frame(360, 432, 72, 72), new Frame(432, 432, 72, 72), //caminando izquierda
			new Frame(0, 576, 72, 72), new Frame(72, 576, 72, 72), new Frame(144, 576, 72, 72), new Frame(216, 576, 72, 72), new Frame(288, 576, 72, 72), //saltando izquierda
			new Frame(0, 648, 72, 72), new Frame(72, 648, 72, 72), new Frame(144, 648, 72, 72), new Frame(216, 648, 72, 72), new Frame(288, 648, 72, 72), //cayendo izquierda
			new Frame(0, 720, 72, 72), new Frame(72, 720, 72, 72), new Frame(144, 720, 72, 72), //aterrizando izquierda
		]
		this.animationFrameSet = {
	    "idle-right": [0, 1, 2, 3, 4],
	    "move-right": [5, 6, 7, 8, 9, 10, 11],
	    "jump-right": [12, 13, 14, 15, 16],
	    "floating-right": [16, 17],
	    "fall-right": [17, 18, 19, 20, 21],
	    "landing-right": [22, 23, 24],

	    "idle-left": [25, 26, 27, 28, 29],
	    "move-left": [30, 31, 32, 33, 34, 35, 36],
	    "jump-left": [37, 38, 39, 40, 41],
	    "floating-left": [41, 42],
	    "fall-left": [42, 43, 44, 45, 46],
	    "landing-left": [47, 48, 49],
		}
		this.actualAnimationFrameSet = this.animationFrameSet["idle-right"]
		this.animationFrameIndex = 0
		this.actualAnimationFrameValue = this.actualAnimationFrameSet [this.animationFrameIndex]
	}
	getInput(e) {
		let direction
		let down = (e.type == 'keydown')
		
		switch (e.keyCode) {
			case 37:
				direction = this.left
				break;
			case 39:
				direction = this.right
				break;
			case 32:
				direction = this.up
				break;
		}
		if (direction) {
			if(direction.down != down) direction.active = down
				direction.down = down
		}
	}
	moveLeft() {this.velocity_x -= this.speed}
	moveRight() {this.velocity_x += this.speed}
	moveUp() {
		if (!this.jumping) {
			this.velocity_y -= this.jump
			this.jumping = true
			this.changeFrameSet(this.animationFrameSet["jump-right"], 6)
		}
	}
	changeFrameSet(frameSet, delay = 10, frameIndex = 0) {
		if(this.actualAnimationFrameSet === frameSet) return

		this.animationCount = 0
	  	this.animationDelay = delay
	  	this.actualAnimationFrameSet = frameSet
	  	this.animationFrameIndex = frameIndex
	  	this.actualAnimationFrameValue = frameSet[frameIndex]
	}
	animate() {
		this.animationCount ++

		while(this.animationCount > this.animationDelay) {
			this.animationCount -= this.animationDelay
			this.animationFrameIndex = (this.animationFrameIndex < this.actualAnimationFrameSet.length - 1) ? this.animationFrameIndex + 1 : 0
			this.actualAnimationFrameValue = this.actualAnimationFrameSet[this.animationFrameIndex]
		}
	}
	checkAnimationSet() {
		if (this.velocity_x > 1) this.changeFrameSet(this.animationFrameSet["move-right"], 6)
		else if (this.velocity_x < -1) this.changeFrameSet(this.animationFrameSet["move-left"], 6)

		else if (this.velocity_x > -1 && this.velocity_x < 1 && !this.jumping) this.changeFrameSet(this.animationFrameSet["idle-right"], 6)
		else if (this.velocity_x < 1 && this.velocity_x > -1 && !this.jumping) this.changeFrameSet(this.animationFrameSet["idle-left"], 6)

		else if (this.velocity_y < -1) this.changeFrameSet(this.animationFrameSet["jump-right"], 6)
		else if (this.velocity_y > 1) this.changeFrameSet(this.animationFrameSet["fall-right"], 6)

		else if (this.velocity_y < -1) this.changeFrameSet(this.animationFrameSet["jump-left"], 6)
		else if (this.velocity_y > 1) this.changeFrameSet(this.animationFrameSet["fall-left"], 6)

		else if (this.velocity_y > -1 && this.velocity_y < 1) this.changeFrameSet(this.animationFrameSet["floating-right"], 6)
	}
	detectCollision(object) {
		let objTop = object.y
		let objRight = object.x+object.width
		let objBottom = object.y+object.height
		let objLeft = object.x

		if((this.ejeX+this.width) > objLeft && this.ejeX < objRight && this.ejeY < objBottom && (this.ejeY+this.height) > objTop){
			if((this.prev_ejeX+this.width) < objLeft){
				this.ejeX = objLeft+this.width+0.5
				this.velocity_x = 0
			}
			else if (this.prev_ejeX > objRight) {
				this.ejeX = objRight+0.5
				this.velocity_x = 0
			}
			else if (this.prev_ejeY > objBottom) {
				this.ejeY = objBottom-0.5
				this.velocity_y = 0
			}
			else if ((this.prev_ejeY+this.height) < objTop) {
				this.ejeY = objTop-this.height-0.5
				this.velocity_y = 0
				this.jumping = false;
			}
		}
	}
	update() {
		this.checkAnimationSet()
		this.animate()
		if (this.left.active) {this.moveLeft()}
		if (this.right.active) {this.moveRight()}
		if (this.up.active) {this.moveUp()}
		this.prev_ejeX = this.ejeX
		this.prev_ejeY = this.ejeY
		this.ejeX += this.velocity_x
		this.ejeY += this.velocity_y
	}
}

class Door {
	constructor(x, y, w, h, next_lvl){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.next_lvl = next_lvl
	}

	detectCollection(player){
		let playerTop = player.ejeY
		let playerRight = player.ejeX+player.width
		let playerBottom = player.ejeY+player.height
		let playerLeft = player.ejeX

		if((this.x+this.w) > playerLeft && this.x < playerRight && this.y < playerBottom && (this.y+this.h) > playerTop){
			return true
		}
		return false
	}
}

class Platform {
	constructor(x, y, width, height){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}
}

class Collectable {
	constructor(img, x, y, w, h){
		this.img = img
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}

	detectCollection(player){
		let playerTop = player.ejeY
		let playerRight = player.ejeX+player.width
		let playerBottom = player.ejeY+player.height
		let playerLeft = player.ejeX

		if((this.x+this.w) > playerLeft && this.x < playerRight && this.y < playerBottom && (this.y+this.h) > playerTop){
			return true
		}
		return false
	}
}

class Spike {
	constructor(img, x, y, w, h){
		this.img = img
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}

	detectCollection(player){
		let playerTop = player.ejeY
		let playerRight = player.ejeX+player.width
		let playerBottom = player.ejeY+player.height
		let playerLeft = player.ejeX

		if((this.x+this.w) > playerLeft && this.x < playerRight && this.y < playerBottom && (this.y+this.h) > playerTop){
			return true
		}
		return false
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