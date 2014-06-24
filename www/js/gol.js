var Gol =  (function() {
  var game_width  = 500,
      game_height = 700,
      board       = document.getElementById('gameboard'),
      ctx         = board.getContext('2d'),
      screen_width, screen_height,
      goal_width  = 200,
      origin      = {
        x: 500,
        y: 350
      },
      paddle,
      score,
      level,
      pause = false,
      frame_count = 0;

  function get_screen_size() {
    var w = 0,
        h = 0;

    board.width = w = window.innerWidth;
    board.height = h = window.innerHeight;

    origin.x = Math.floor(w / 2);
    origin.y = Math.floor(h / 2);

    return {
      width: screen_width,
      height: screen_height
    }
  }   menu_button

  function update() {
    ballRegulator.reap();
    score += ballRegulator.count_goals(origin.x, goal_width);
    ballRegulator.add({
      ctx: ctx,
      frame_count: frame_count
    });
    ballRegulator.move(paddle.normal);
    frame_count++;
  }

  function draw() {
    ctx.clearRect(0, 0, board.width, board.height);
    ctx. fillStyle = "#000000";
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + score, 100, 20);
    ctx.fillText("Level: " + level, 180, 20);
    ctx.fillText("Angle: " + Math.round(NEWTON.to_deg(paddle.angle)), 260, 20);
    ctx.fillText("Normal Angle: " + Math.round(NEWTON.to_deg(paddle.normal.theta)), 340, 20);
    ctx.fillText("Ball Angle: " + Math.round(NEWTON.to_deg(ballRegulator.balls[0].velocity.theta)), 440, 20);
    ctx.fillText("Ball Vx: " + Math.round(ballRegulator.balls[0].velocity.vx), 540, 20);
    ctx.fillText("Ball Vy: " + Math.round(ballRegulator.balls[0].velocity.vy), 640, 20);
    ctx.fillRect(origin.x - goal_width / 2, 50, goal_width, 35);

    ctx.fillRect(origin.x, origin.y, 4, 4);

    ballRegulator.draw();
    paddle.draw();
  }

  return {
    init: function() {
      get_screen_size();
      score = 0;
      level = 1;
      requestAnimationFrame(Gol.loop);
      paddle = new Paddle({
        ctx: ctx,
        origin: {
          x: board.width / 2,
          y: board.height - 150
        },
        canvas: board
      });
      paddle.init();
      ballRegulator = new BallRegulator({
        ctx: ctx,
        origin: {
          x: origin.x,
          y: board.height - 150
        },
        board: {
          height: window.innerHeight,
          width: window.innerWidth
        }
      });
      ballRegulator.origin_x = origin.x;
      ballRegulator.origin_y = origin.y;
    },

    pause: function() {
      pause = true;
    },

    unpause: function() {
      pause = false;
      this.loop();
    },

    game_over: function() {
      pause = true;
      this.set_best_score(score);
      $('#game').hide();
      $('#game_over_score').text(score);
      $('#game_over_best').text(this.get_best_score());
      $('#game_over_menu').show();
    },

    set_best_score: function(score) {
      var store_score = window.localStorage.getItem('best_score');
      if(store_score == null || store_score < score){
        gamecenter.submitScore(null, null, { score: score, leaderboardId: "main_leaderboard" });
        window.localStorage.setItem('best_score', score);
      }
    },

    get_best_score: function() {
      return window.localStorage.getItem('best_score');
    },

    restart: function() {
      pause = false;
      this.init();
    },

    loop: function() {
      update();
      draw();
      if(pause == false){
        requestAnimationFrame(Gol.loop);
      }
    }
  }
})();
