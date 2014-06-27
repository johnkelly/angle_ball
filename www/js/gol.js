var Gol =  (function() {
  var game_width  = 500,
      game_height = 700,
      board       = document.getElementById('gameboard'),
      ctx         = board.getContext('2d'),
      screen_width, screen_height,
      origin      = {
        x: 500,
        y: 350
      },
      paddle,
      score,
      level,
      pause = true,
      frame_count = 0;

  function get_screen_size() {
    var w = 0,
        h = 0;

    board.width = w = window.innerWidth;

    if(window.innerHeight <= 568) {
      board.height = h = (window.innerHeight - 50);
    } else {
      board.height = h = (window.innerHeight - 90);
    }

    origin.x = Math.floor(w / 2);
    origin.y = Math.floor(h / 2);

    return {
      width: screen_width,
      height: screen_height
    }
  }   menu_button

  function update() {
    if(ballRegulator.balls.length > 0){
      score += net.count_goals(ballRegulator.balls);
      ballRegulator.reap(net);
    }
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

    net.draw();
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
          y: board.height - 30
        },
        canvas: board
      });
      paddle.init();

      net = new Net({
        ctx: ctx,
        origin_x: board.width / 2
      });

      ballRegulator = new BallRegulator({
        ctx: ctx,
        origin: {
          x: origin.x,
          y: board.height - 30
        },
        board: {
          height: window.innerHeight,
          width: window.innerWidth
        }
      });
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
        if(window.gamecenter) {
          gamecenter.submitScore(null, null, { score: score, leaderboardId: "main_leaderboard" });
        }
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

    start: function() {
      pause = false;
      this.loop();
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
