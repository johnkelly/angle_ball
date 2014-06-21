function Vector(mag, theta) {
  this.magnitude = mag || 1;
  this.theta = theta || 0;
  this.x_direction = (this.theta > 0) ? 1 : -1;
  this.theta = Math.abs(this.theta);
  this.vx = Math.abs(this.magnitude * Math.cos(this.theta)) * this.x_direction;
  this.vy = Math.abs(this.magnitude * Math.sin(this.theta));
}

Vector.prototype = {
  set_components: function(vx, vy) {
    this.theta = Math.atan(vy/vx);
  },

  set_angle: function(theta) {
    this.vx = this.magnitude * Math.cos(theta);
    this.vy = this.magnitude * Math.sin(theta);
  },

  dot: function(vector) {
    if (!(vector instanceof Vector)) {
      return false;
    }

    // I think we need more consideration of the portion inside cos() due
    // to negatives and relative angles
    return this.magnitude * vector.magnitude * Math.cos(this.theta - vector.theta)
  },

  add: function(vector) {
    this.vx += vector.vx;
    this.vy += vector.vy;
    return vector;
  },

  subtract: function(vector) {
    this.vx -= vector.vx;
    this.vy -= vector.vy;
    return vector;
  },

  multiply: function(amount) {
    this.vx *= amount;
    this.vy *= amount;
    return this;
  }
}
