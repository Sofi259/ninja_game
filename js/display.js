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

}

// Swal.fire({
//   titleText: '¡Saca ese ninja interior!',
//   imageUrl: 'assets/estrellas_ninja_perder.png',
//   color: '#00000',
//   width: '350px',
//   imageWidth: 250,
//   imageHeight: 80,
//   imageAlt: 'stars',
//   showCloseButton: false,
//   showCancelButton: true,
//   focusConfirm: false,
//   confirmButtonColor: '#4d44b0',
//   cancelButtonColor: '#4d44b0',
//   confirmButtonText:
//     '<i class="fa fa-thumbs-up"></i> Reintentar',
//   confirmButtonAriaLabel: 'reintentar',
//   cancelButtonText:
//     '<i class="fa fa-thumbs-down"></i> Siguiente', //no se como poner los iconos y no lo explica en ningun lado... en realidad les pondría iconos a los botones y no palabras
//   cancelButtonAriaLabel: 'siguienteNivel'
// })

// Swal.fire({
//   titleText: '¡Eso es!',
//   imageUrl: 'assets/estrellas_ninja_ganar.png',
//   color: '#00000',
//   width: '350px',
//   imageWidth: 300,
//   imageHeight: 180,
//   imageAlt: 'stars',
//   showCloseButton: false,
//   showCancelButton: true,
//   focusConfirm: false,
//   confirmButtonColor: 'rgb(33, 21, 170)',
//   cancelButtonColor: 'rgb(33, 21, 170)',
//   confirmButtonText:
//     '<i class="fa fa-thumbs-up"></i> Reintentar',
//   confirmButtonAriaLabel: 'reintentar',
//   cancelButtonText:
//     '<i class="fa fa-thumbs-down"></i> Siguiente',
//   cancelButtonAriaLabel: 'siguienteNivel'
// })