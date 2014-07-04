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
  this.outbound = false;
  this.exit_coordinates = null;
  this.current_normal = null;
}

Ball.prototype = {
  init: function(config) {
    var raw_angle = Math.atan((this.start_y - this.end_y)/ (this.end_x - this.start_x));

    /**
    *   Normalize all theta to be in quadrants 3 & 4 (moving down)
    */
    if (raw_angle > 0) {
      raw_angle += Math.PI;
    }
    this.ctx = config.ctx;
    this.velocity = new Vector(this.speed, raw_angle);
  },

  update: function(normal) {
    if(Math.floor(this.end_y - this.y) <= 3 && this.outbound == false){
      bounceSound.play();
      this.reflect(normal);
    }
    if(this.outbound == false) {
      this.current_normal = normal;
      this.exit_coordinates = this.calculate_exit_coordinates(normal);
    }
    this.move();
  },

  draw: function() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(this.x, this.y, this.BALL_RAD, this.BALL_RAD);
  },

  move: function() {
    this.x += this.velocity.vx
    this.y += this.velocity.vy
  },

  reflect: function(normal) {
    var new_velocity = this.calculate_reflect(normal);
    this.velocity.vx = new_velocity.vx
    this.velocity.vy = new_velocity.vy
    this.velocity.set_components();
    this.outbound = true;
  },

  calculate_reflect: function(normal) {
    //Vnew = V - 2*(V dot N)*N
    var reflect_vector = this.velocity,
        norm = normal.normalize(),
        scale;

    norm.set_angle(-norm.theta);
    scale = reflect_vector.dot(norm);     

    return {
      vx: (this.velocity.vx - 2 * scale * norm.vx),
      vy: (this.velocity.vy - 2 * scale * norm.vy)
    }
  },

  calculate_exit_coordinates: function(normal) {
    var potential_reflect = this.calculate_reflect(normal);
    var time = ((-1 - this.end_y) / potential_reflect.vy);
    var end_x = ((potential_reflect.vx * time) + this.end_x);
    return { x: end_x, y: -1 }
  },

  draw_trajectory: function() {
    if(this.outbound == false) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.end_x, this.end_y);
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.stroke();
    }

    if(this.exit_coordinates != null){
      this.ctx.beginPath();
      this.ctx.moveTo(this.end_x, this.end_y);
      this.ctx.lineTo(this.exit_coordinates.x, this.exit_coordinates.y);
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.stroke();
    }
  }
}
