class Player {
	constructor(ejeX, ejeY, width, height) {
		this.ejeX = ejeX
		this.ejeY = ejeY
		this.width = width
		this.height = height

		this.left = {active:false, down:false}
		this.right = {active:false, down:false}
		this.up = {active:false, down:false}

		this.speed = 6
		this.velocity_x = 0
		this.velocity_y = 0
		this.jump = 50
		this.jumping = true

		this.animationCount = 0
		this.animationDelay = 6
		this.animationImage = new Image()
		this.animationImage.src = 'assets/blue_spritesheet-export.png'
		this.animationFrames = [
			new Frame(0, 0, 72, 72), new Frame(72, 0, 72, 72), new Frame(144, 0, 72, 72), new Frame(216, 0, 72, 72), new Frame(288, 0, 72, 72), new Frame(360, 0, 72, 72), //mirando derecha
			new Frame(0, 72, 72, 72), new Frame(72, 72, 72, 72), new Frame(144, 72, 72, 72), new Frame(216, 72, 72, 72), new Frame(288, 72, 72, 72), new Frame(360, 72, 72, 72), //caminando derecha
			new Frame(0, 216, 72, 72), new Frame(72, 216, 72, 72), new Frame(144, 216, 72, 72), new Frame(216, 216, 72, 72), new Frame(288, 216, 72, 72), //saltando derecha
			new Frame(0, 288, 72, 72), new Frame(72, 288, 72, 72), new Frame(144, 288, 72, 72), new Frame(216, 288, 72, 72), new Frame(288, 288, 72, 72), //cayendo derecha
		]
		this.animationFrameSet = {

	    // "idle-left" : [0],
	    // "jump-left" : [1],
	    // "move-left" : [2, 3, 4, 5],
	    "idle-right": [0, 1, 2, 3, 4, 5],
	    "move-right": [6, 7, 8, 9, 10, 11],
	    "jump-right": [12, 13, 14, 15, 16],
	    "floating-right": [16, 17],
	    "fall-right": [17, 18, 19, 20, 21],
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
		if(direction.down != down) direction.active = down
			direction.down = down
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
		if (this.velocity_x > 1) this.changeFrameSet(this.animationFrameSet ["move-right"], 6)
		else if (this.velocity_x < -1) this.changeFrameSet(this.animationFrameSet ["move-right"], 6)

		else if (this.velocity_x > -1 && this.velocity_x < 1) this.changeFrameSet(this.animationFrameSet ["idle-right"], 6)

		else if (this.velocity_y < -1) this.changeFrameSet(this.animationFrameSet ["jumping-right"], 6)
		else if (this.velocity_y > 1) this.changeFrameSet(this.animationFrameSet ["fall-right"], 6)

		else if (this.velocity_y > -1 && this.velocity_y < 1) this.changeFrameSet(this.animationFrameSet ["floating-right"], 6)
	}
	update() {
		this.checkAnimationSet()
		this.animate()
		if (this.left.active) {this.moveLeft()}
		if (this.right.active) {this.moveRight()}
		if (this.up.active) {this.moveUp()}
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




	

