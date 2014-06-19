function Ball(config) {
  var DEFAULT_SPEED = 5000;

  this.id = config.id;
  this.BALL_RAD = 5;
  this.start_x = this.x = config.start_x || 0;
  this.start_y = this.y = config.start_y || -20;
  this.end_x = config.end_x;
  this.end_y = config.end_y;
  this.speed = config.speed || DEFAULT_SPEED;
  this.x_direction = (this.start_x > (config.max_x / 2)) ? -1 : 1;
}

Ball.prototype = {
  init: function(config) {
    this.ctx = config.ctx;
    this.velocity = new Vector(this.speed, Math.atan((this.end_y - this.start_y)/ (this.end_x - this.start_x)));
    this.draw();
  },

  update: function(normal) {
    if(Math.floor(this.end_y - this.y) <= 3){
      this.velocity.reflect(normal);
    }
    this.move();
  },

  draw: function() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(this.x, this.y, this.BALL_RAD, this.BALL_RAD);

    //ball trajectory
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.end_x, this.end_y);
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.stroke();
  },

  move: function() {
    this.x += this.velocity.vx
    this.y += this.velocity.vy
  },
}
