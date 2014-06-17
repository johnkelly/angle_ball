function Ball(config) {
  var DEFAULT_SPEED = 5000;

  this.BALL_RAD = 5;
  this.start_x = this.x = config.start_x || 0;
  this.start_y = this.y = config.start_y || -20;
  this.end_x = config.end_x;
  this.end_y = config.end_y;
  this.speed = config.speed || DEFAULT_SPEED;
  this.outbound = false;
  this.half_x = config.max_x / 2;
}

Ball.prototype = {
  init: function(config) {
    this.ctx = config.ctx;
    this.psi = calculate_psi(this)
    this.distance = NEWTON.pyth((this.end_x - this.start_x), (this.end_y - this.start_y));
    var x_direction = this.start_x > this.half_x ? -1 : 1
    this.velocity_x = (this.distance * Math.cos(this.psi)) / 500 * x_direction
    this.velocity_y = Math.abs((this.distance * Math.sin(this.psi)) / 500)
    this.velocity = new Vector(this.speed, Math.atan((this.end_y - this.start_y)/ (this.end_x - this.start_x)));

    this.draw();
  },

  update: function(normal) {
    if(this.outbound) {
      this.move();
    } else if(Math.floor(this.end_y - this.y) > 0) {
      this.move();
    } else {
      this.set_new_destination(normal);
    }
  },

  draw: function() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(this.x, this.y, this.BALL_RAD, this.BALL_RAD);
  },

  move: function() {
    this.x += this.velocity_x
    this.y += this.velocity_y
  },

  set_new_destination: function(normal) {
    console.log(this.velocity.dot(normal));
    // var gamma = Math.PI / 2 + theta - this.psi,
    //     outbound_angle = Math.PI - this.psi - theta;

    this.outbound = true;
    this.velocity_y = this.velocity_y * -1
  }
}

calculate_psi = function(ball) {
  // var top = (ball.start_x * ball.end_x) + (ball.start_y * ball.end_y)
  // var bottom = (Math.sqrt(Math.pow(ball.start_x, 2) + Math.pow(ball.start_y, 2)) * Math.sqrt(Math.pow(ball.end_x, 2) + Math.pow(ball.end_y, 2)))
  // return Math.acos(top/bottom)
  return Math.atan((ball.end_y- ball.start_y) / (ball.end_x - ball.start_x))
}
