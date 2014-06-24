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

  reap: function() {
    for (var i = 0; i < this.balls.length; i++) {
      if (this.balls[i].y < 0) {
        Gol.game_over();
        // delete this.balls[i];
        // this.balls.splice(i, 1);
      }else if(this.balls[i].y > this.max_y){
        Gol.game_over();
        // delete this.balls[i];
        // this.balls.splice(i, 1);
      }else if(this.balls[i].x < 0){
        Gol.game_over();
        // delete this.balls[i];
        // this.balls.splice(i, 1);
      }else if(this.balls[i].x > this.max_x){
        Gol.game_over();
        // delete this.balls[i];
        // this.balls.splice(i, 1);
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

  // ctx.fillRect(origin.x - goal_width / 2, 50, goal_width, 35);
  count_goals: function(origin_x, goal_width) {
    var goal_start_x = (origin_x - (goal_width / 2));
    var goal_end_x = (goal_start_x + goal_width);

    var goals = $.grep(this.balls, function(ball) {
      return (ball.velocity.vy < 0 && ball.x >= goal_start_x && ball.x <= goal_end_x) && (ball.y >= 50 && ball.y <= 85)
    });

    //TODO Make this work for multiple balls using id?
    if(goals.length > 0){
      delete this.balls[0];
      this.balls.splice(0, 1);
    }

    return goals.length;
  }
}
