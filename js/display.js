class World {
	constructor(canvas, width, height, player) {
		this.canvas = canvas
		this.canvas.width = width
		this.canvas.height = height
		this.ctx = this.canvas.getContext('2d')

		this.player = player

		this.gravity = 3
		this.friction = 0.9

		this.actualLevel = undefined
		this.background = new Image()
		this.score = 0
		this.doors = []
		this.platforms = []
		this.collectables = []
		this.spikes = []
	}

	loadLevel(level) {
		this.actualLevel = level
		this.background.src = level.background
		let gridSize = Math.round(this.canvas.width/level.columns)

		level.plataforms.forEach(platform => {
			let x = platform.x*gridSize
			let y = platform.y*gridSize
			let w = platform.w*gridSize
			let h = platform.h*gridSize
			let platformObj = new Platform(x, y, w, h)
			this.platforms.push(platformObj)
		})

		level.collectables.forEach(collectable=>{
			let x = collectable.x*gridSize
			let y = collectable.y*gridSize
			let w = gridSize
			let h = gridSize
			let collectableObj = new Collectable(collectable.img, x, y, w, h)
			this.collectables.push(collectableObj)
		})

		level.spikes.forEach(spike=>{
			let x = spike.x*gridSize
			let y = spike.y*gridSize
			let w = gridSize
			let h = gridSize
			let spikeObj = new Spike(spike.img, x, y, w, h)
			this.spikes.push(spikeObj)
		})

		level.doors.forEach(door=>{
			let x = door.x*gridSize
			let y = door.y*gridSize
			let w = door.w*gridSize
			let h = door.h*gridSize
			let doorObj = new Door(x, y, w, h, door.next_lvl)
			this.doors.push(doorObj)
		})

		this.player.ejeX = level.player_x*gridSize
		this.player.ejeY = level.player_y*gridSize
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
		//limpiar pantalla
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
		
		//dibujado del mapa
		this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height)

		//dibujado de coleccionables
		this.collectables.forEach(collectable => {
			let collectableImg = new Image()
			collectableImg.src = collectable.img
			this.ctx.drawImage(collectableImg, collectable.x, collectable.y, collectable.w, collectable.h)
		})

		//dibujado de pinchos
		this.spikes.forEach(spike => {
			let spikeImg = new Image()
			spikeImg.src = spike.img
			this.ctx.drawImage(spikeImg, spike.x, spike.y, spike.w, spike.h)
		})

		//player
		this.player.velocity_y += this.gravity
		this.player.update()
		this.player.velocity_x *= this.friction
		this.player.velocity_y *= this.friction
		this.playerCollision(this.player)

		//animaciones
		let AfsIndex = this.player.actualAnimationFrameValue
		let aFrame = this.player.animationFrames[AfsIndex]
		let sx = aFrame.x
		let sy = aFrame.y
		let sFrameSize = 72
		let dx = this.player.ejeX
		let dy = this.player.ejeY
		this.ctx.drawImage(this.player.animationImage, sx, sy, sFrameSize, sFrameSize, dx, dy, this.player.width, this.player.height)

		//texto de score
		this.ctx.font = "30px Arial";
		this.ctx.fillStyle = "white";
		this.ctx.fillText(`Puntaje: ${this.score}`, 35, 35);

		//colision con puertas
		this.doors.forEach(async door=>{
			if(door.detectCollection(this.player)){
				if(door.next_lvl){
					let response = await fetch(`assets/levels/${door.next_lvl}`)
					let Nlvl = await response.json()
					this.loadLevel(Nlvl)
				}else{
					Swal.fire("Has ganado!")
				}
			}
		})

		//colisiones con plataformas
		this.platforms.forEach(plataform => {
			this.player.detectCollision(plataform)
		})

		//colision con coleccionables
		this.collectables.forEach(collectable => {
			if(collectable.detectCollection(this.player)){
				let collectableIndex = this.collectables.indexOf(collectable)
				this.collectables.splice(collectableIndex, 1)
				this.score ++
			}
		})

		//colision con pinchos
		this.spikes.forEach(spike => {
			if(spike.detectCollection(this.player)){
				this.score = 0
				this.loadLevel(this.actualLevel)
			}
		})
	}
}