class Engine {
	constructor(time_step, update) {
		this.accumulated_time        = 0
		this.animation_frame_request = undefined
		this.time                    = undefined
		this.time_step               = time_step
		this.update = update
		this.run = function(time_stamp) {
			this.accumulated_time += time_stamp - this.time
			this.time = time_stamp

			if (this.accumulated_time >= this.time_step * 3) {
			  this.accumulated_time = this.time_step
			}

			while(this.accumulated_time >= this.time_step) {
			  this.accumulated_time -= this.time_step
			  this.update(time_stamp)
			  this.updated = true
			}
			this.animation_frame_request = window.requestAnimationFrame(this.handleRun)
		}
		this.handleRun = (time_step) => { this.run(time_step) }
	}
	start() {
	    this.accumulated_time = this.time_step
	    this.time = window.performance.now()
	    this.animation_frame_request = window.requestAnimationFrame(this.handleRun)
  	}
  	stop() {
  		window.cancelAnimationFrame(this.animation_frame_request)
  	}
}

