function BallRegulator(config) {
  this.balls = [];
  this.origin_x = config.origin.x;
  this.origin_y = config.origin.y;
  this.max_x = config.board.width;
  this.end_y = (config.board.height - 150);
}

BallRegulator.prototype = {
  add: function(config) {
    if(config.frame_count % 30 == 0){
      var newBall = new Ball({
        start_x: NEWTON.rand(this.max_x),
        start_y: -1,
        end_x: this.origin_x,
        end_y: this.end_y,
        speed: 5
      });
      newBall.init({
        ctx: config.ctx
      });
      this.balls.push(newBall);
    }
  },

  reap: function() {
    for (var i = 0; i < this.balls.length; i++) {
      if (this.balls[i].outbound && this.balls[i].y < 0) {
        delete this.balls[i];
        this.balls.splice(i, 1);
      }
    }
  },

  draw: function() {
    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
    }
  },

  move: function(angle) {
    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].update(angle);
    }
  }
}
