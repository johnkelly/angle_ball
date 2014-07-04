function Paddle(config) {
  this.width = 150;
  this.height = 4;
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
    this.normal = new Vector(1, (this.angle + Math.PI / 2));

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

    $(this.canvas).on('touchstart', function(e) {
      if (this_obj.click_on(e)) {
        this_obj.moving = true;
      }
      else {
        this.moving = false;
      }
    });

    $(this.canvas).on('touchmove', function(e) {
      if (this_obj.moving === true) {
        this_obj.update_angle(e.originalEvent);
      }
    });

    $(this.canvas).on('touchend', function() {
      this_obj.moving = false;
    });
  },


  draw: function() {
    this.ctx.fillStyle = this.color;

    // Set location for paddle to be drawn
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.rotate(-this.angle);


    this.ctx.fillRect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);

    // Pop the translation/rotation
    this.ctx.rotate(this.angle);
    this.ctx.translate(-(this.center.x), -(this.center.y));
  },

  click_on: function(evt) {
    var hit = true,
        x_radius = (this.width / 2) * Math.abs(Math.cos(this.angle)) + this.TOUCH_SLOP,
        y_radius = (this.width / 2) * Math.abs(Math.sin(this.angle)) + this.TOUCH_SLOP;

    /** Only pay attention to clicks in the area of the paddle
    *   when updating paddle angle
    */
    if (evt.pageX - this.center.x > x_radius || evt.pageX - this.center.x < -x_radius || evt.pageY - this.center.y > y_radius || evt.pageY - this.center.y < -y_radius) {
      hit = false;
    }

    return hit;
  },

  update_angle: function(evt) {
    var angle = Math.tan(-(evt.pageY - this.center.y) / (evt.pageX - this.center.x));

    /**
    *   Restrict paddle movement to PI/4 rads in either
    *   direction
    */ 
    if (angle < (Math.PI / 4) && -(Math.PI / 4) < angle) {
      this.normal.set_angle(this.angle + Math.PI / 2); 
      this.angle = angle;     
    }
    return this;
  }
}
