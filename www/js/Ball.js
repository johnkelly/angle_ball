function Ball(config) {
  var DEFAULT_SPEED = 5000;

  this.BALL_RAD = 5;
  this.start_x = this.x = config.start_x || 0;
  this.start_y = this.y = config.start_y || -20;
  this.end_x = config.end_x;
  this.end_y = config.end_y;
  this.speed = config.speed || DEFAULT_SPEED;
  this.outbound = false;
}

Ball.prototype = {
  init: function(config) {
    this.ctx = config.ctx;
    this.psi = Math.atan((this.end_y - this.y) / Math.abs(this.end_x - this.x));

    if (this.end_x > this.x) {
      this.psi = Math.PI - this.psi;
    }
    this.draw();
  },

  update: function(theta) {
    var dist_x = this.end_x - this.x,
        dist_y = this.end_y - this.y,
        ratio;

    if (Math.abs(dist_x) > 3 || Math.abs(dist_y) > 3) {
      ratio = NEWTON.pyth(dist_x, dist_y) / 5;

      this.x = this.x + dist_x / ratio;
      this.y = this.y + dist_y / ratio;
    }
    else {
      var outbound_angle,
          psi,
          gamma;

      gamma = Math.PI / 2 + theta - this.psi;

      outbound_angle = Math.PI - this.psi - theta;
      this.outbound = true;

      this.end_y = -10;
      if(this.start_x < 500) {
        this.end_x = this.start_x + 500;
      }else if(this.start_x == 500){
        this.end_x = 500;
      }else{
        this.end_x = this.start_x - 500;
      }
    }

  },

  draw: function() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(this.x, this.y, this.BALL_RAD, this.BALL_RAD);
  }
}
