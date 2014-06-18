function Vector(mag, theta, x_direction) {
  this.magnitude = mag || 1;
  this.theta = theta || 0;
  this.x_direction = x_direction || 1;
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
  },


  reflect: function(normal) {
    //r = v - 2 (v.n)n
    var normal_vector = new Vector(normal.magnitude, normal.theta);
    var new_vector = normal_vector.multiply(2 * this.dot(normal_vector));

    if(new_vector.vy > 0) {
      new_vector.vy *= -1;
    }
    this.add(new_vector);

    //Vnew = b * ( -2 *(V dot N) * N + V )
    // var bounce = 1; //range from 0 to 1
    // new_vector.add(this);
    // console.log("NEW VECTOR 2", new_vector.vx, new_vector.vy)
    // new_vector.multiply(bounce);
    // console.log("NEW VECTOR 3", new_vector.vx, new_vector.vy)



    // console.log("Paddle", normal_vector);
    // var new_vector = normal_vector.multiply(-2 * this.dot(normal_vector));
    // console.log("NEW VECTOR", new_vector.vx, new_vector.vy)
    // new_vector.add(this);
    // console.log("NEW VECTOR 2", new_vector.vx, new_vector.vy)
    // new_vector.multiply(bounce);
    // console.log("NEW VECTOR 3", new_vector.vx, new_vector.vy)

    // console.log(this.vx, this.vy);
    // this.vx = new_vector.vx;
    // this.vy = new_vector.vy;
    // console.log(this.vx, this.vy);
  }
}
