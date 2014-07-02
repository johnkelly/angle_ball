function BallRegulator(config) {
  this.balls = [];
  this.origin_x = config.origin.x;
  this.origin_y = config.origin.y;
  this.max_x = config.board.width;
  this.max_y = config.board.height;
  this.current_id = -1;
}

BallRegulator.prototype = {
  add: function(config) {
    if(this.balls.length < 1){
      this.current_id += 1;

      var newBall = new Ball({
        id: this.current_id,
        start_x: NEWTON.rand(this.max_x),
        start_y: -1,
        end_x: this.origin_x,
        end_y: this.origin_y,
        speed: 5,
        max_x: this.max_x
      });
      newBall.init({
        ctx: config.ctx
      });
      this.balls.push(newBall);
    }
  },

  reap: function(net) {
    for (var i = 0; i < this.balls.length; i++) {
      var ball = this.balls[i];

      if (ball.y < 0) {
        AngleBall.game_over();
      }else if(ball.y > this.max_y){
        AngleBall.game_over();
      }else if(ball.x < 0){
        AngleBall.game_over();
      }else if(ball.x > this.max_x){
        AngleBall.game_over();
      }else if(net.in_net(ball)){
        delete ball;
        this.balls.splice(i, 1);
      }
    }
  },

  draw: function() {
    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
    }
  },

  move: function(normal) {
    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].update(normal);
    }
  },

  draw_trajectories: function() {
    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].draw_trajectory();
    }
  }
}
