function Net(config) {
  this.width = config.width || 200;
  this.height = config.height || 35;

  this.origin_x = config.origin_x;
  this.ctx = config.ctx;
  this.start_x = (config.origin_x - (this.width / 2));
  this.end_x = this.start_x + this.width;
  this.start_y = 50;
  this.end_y = this.start_y + this.height;
}

Net.prototype = {
  count_goals: function(balls) {
    var goals = [];

    for(i=0; i < balls.length; i++){
      var ball = balls[i];
      if(this.in_net(ball)){
        goals.push(ball);
      }
    }
    return goals.length;
  },

  in_net: function(ball) {
    var has_balls = ((ball.outbound && (this.start_x <= ball.x) && ( ball.x <= this.end_x) && (this.start_y <= ball.y) && (ball.y <= this.end_y)));
    return has_balls;
  },

  draw: function() {
    this.ctx.fillRect(this.start_x, this.start_y, this.width, this.height);
  }
}
