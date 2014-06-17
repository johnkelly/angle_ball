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
    var dist_y = (this.end_y - this.y);

    if(this.outbound) {
      move_closer_to_destination(this);
    } else if(Math.floor(dist_y) > 0) {
      move_closer_to_destination(this);
    } else {
      set_new_destination(this, theta);
    }
  },

  draw: function() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(this.x, this.y, this.BALL_RAD, this.BALL_RAD);
  }
}

move_closer_to_destination = function(ball) {
  var dist_x = (ball.end_x - ball.x);
  var dist_y = (ball.end_y - ball.y);
  var ratio = NEWTON.pyth(dist_x, dist_y) / 5;

  ball.x += dist_x / ratio;
  ball.y += dist_y / ratio;
}

set_new_destination = function(ball, theta) {
  var gamma = Math.PI / 2 + theta - ball.psi;
  var outbound_angle = Math.PI - ball.psi - theta;

  ball.outbound = true;

  ball.end_y = -1;
  if(ball.start_x < 500) {
    ball.end_x = ball.start_x + 500;
  }else if(ball.start_x == 500){
    ball.end_x = 500;
  }else{
    ball.end_x = ball.start_x - 500;
  }
}
