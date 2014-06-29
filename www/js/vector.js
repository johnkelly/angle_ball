/**
* 2D Vector 
*
* Angle references start with theta = 0 pointing to the right
* and increasing in a counter-clockwise direction
*/
function Vector(mag, theta) {
  this.magnitude = mag || 1;
  this.theta = theta || 0;
  this.x_direction = (Math.PI / 2 < this.theta && this.theta < 3 * Math.PI / 2) ? -1 : 1;
  this.vx = Math.abs(this.magnitude * Math.cos(this.theta)) * this.x_direction;
  this.vy = Math.abs(this.magnitude * Math.sin(this.theta));
}

Vector.prototype = {
  set_components: function(vx, vy) {
    if (vx && vy) {
      this.theta = Math.atan(vy/vx); 
    }
    else {
      this.theta = Math.atan(this.vy / this.vx);
    }
    this.update_magnitude();     
    return this;
  },

  set_angle: function(theta) {
    this.vx = this.magnitude * Math.cos(theta);
    this.vy = this.magnitude * Math.sin(theta);
    this.theta = theta;

    return this;
  },

  update_magnitude: function(vx, vy) {
    if (vx === undefined || vy === undefined) {
      this.magnitude = NEWTON.pyth(this.vx, this.vy);
    }
    else {
      this.magnitude = NEWTON.pyth(vx, vy);
    }
    
    return this;
  },

  dot: function(vector) {
    if (!(vector instanceof Vector)) {
      return false;
    }

    return (this.vx * vector.vx + this.vy * vector.vy);
  },

  add: function(vector) {
    this.vx += vector.vx;
    this.vy += vector.vy;

    this.set_components(this.vx, this.vy);
    this.update_magnitude();
    return this;
  },

  subtract: function(vector) {
    this.vx -= vector.vx;
    this.vy -= vector.vy;

    this.set_components(this.vx, this.vy);
    this.update_magnitude();
    return this;
  },

  multiply: function(amount) {
    this.vx *= amount;
    this.vy *= amount;

    this.update_magnitude();
    return this;
  },

  normalize: function() {
    var norm_vector = new Vector(1, this.theta);

    norm_vector.vx = this.vx / this.magnitude;
    norm_vector.vy = this.vy / this.magnitude;

    return norm_vector;
  }
}
