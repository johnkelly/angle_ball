function Ball(config) {
  var DEFAULT_SPEED = 5000;

  this.BALL_RAD = 5;
  this.start_x = this.x = config.start_x || 0;
  this.start_y = this.y = config.start_y || -20;
  this.end_x = config.end_x;
  this.end_y = config.end_y;
  this.speed = config.speed || DEFAULT_SPEED;
  this.outbound = false;
  this.x_direction = (this.start_x > (config.max_x / 2)) ? -1 : 1;
}

Ball.prototype = {
  init: function(config) {
    this.ctx = config.ctx;
    this.velocity = new Vector(this.speed, Math.atan((this.end_y - this.start_y)/ (this.end_x - this.start_x)), this.x_direction);
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
    this.x += this.velocity.vx
    this.y += this.velocity.vy
  },

  set_new_destination: function(normal) {
    console.log(this.velocity.dot(normal));
    this.outbound = true;
    this.velocity.vy = this.velocity.vy * -1
  }
}
