function Paddle(config) {
  this.width = 150;
  this.height = 1;
  this.color = '#FFFFFF';
  this.angle = 0;
  this.ctx = config.ctx;
  this.canvas = config.canvas;
  this.center = config.origin;
  this.TOUCH_SLOP = 10;
}

Paddle.prototype = {
  init: function() {
    var this_obj = this;
    this.draw();

    $(this.canvas).on('mousedown', function(e) {
      if (this_obj.click_on(e)) {
        this_obj.moving = true;
      }
      else {
        this.moving = false;
      }
    });

    $(this.canvas).on('mousemove', function(e) {
      if (this_obj.moving === true) {
        this_obj.update_angle(e);
      }
    });

    $(this.canvas).on('mouseup', function() {
      this_obj.moving = false;
    });
  },

  draw: function() {
    this.ctx.fillStyle = this.color;

    // Set location for paddle to be drawn
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.rotate(this.angle);


    this.ctx.fillRect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);

    // Pop the translation/rotation
    this.ctx.rotate(-this.angle);
    this.ctx.translate(-(this.center.x), -(this.center.y));
  },

  click_on: function(evt) {
    var hit = true,
        x_radius = (this.width / 2) * Math.cos(this.angle) + this.TOUCH_SLOP;

    if (evt.pageX - this.center.x > x_radius || evt.pageX - this.center.x < -x_radius) {
      hit = false;
    }


    return hit;
  },

  update_angle: function(evt) {
    this.angle = Math.tan((evt.pageY - this.center.y) / (evt.pageX - this.center.x));
    return this;
  }
}