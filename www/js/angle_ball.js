var AngleBall =  (function() {
  var game_width  = 500,
      game_height = 700,
      board       = document.getElementById('gameboard'),
      ctx         = board.getContext('2d'),
      background  = document.getElementById('background'),
      back_ctx    = background.getContext('2d'),
      screen_width, screen_height,
      origin      = {
        x: 500,
        y: 350
      },
      paddle,
      score,
      level = 1,
      pause = true,
      frame_count = 0;

  function get_screen_size() {
    var w = 0,
        h = 0;

    board.width = background.width = w = window.innerWidth;

    if(window.innerHeight <= 568) {
      board.height = background.height = h = (window.innerHeight - 50);
    } else {
      board.height = background.height = h = (window.innerHeight - 90);
    }

    origin.x = Math.floor(w / 2);
    origin.y = Math.floor(h / 2);

    return {
      width: screen_width,
      height: screen_height
    }
  }

  function update() {
    if(ballRegulator.balls.length > 0){
      score += net.count_goals(ballRegulator.balls);
      level = difficultyRegulator.get_level(score, level);
      ballRegulator.reap(net);
      difficultyRegulator.adjust_speed(ballRegulator);
      net = difficultyRegulator.adjust_net(net);
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

    ctx.fillStyle = "#ffffff";
    ctx.font = '40pt Calibri';
    if(score > 0){
      var score_width = ctx.measureText(score).width;
      ctx.fillText(score, ((board.width / 2) - (score_width / 2)), ((board.height / 2) + 20));
    }

    net.draw();
    ballRegulator.draw();
    difficultyRegulator.draw({ ballRegulator: ballRegulator });
    paddle.draw();
  }

  return {
    init: function() {
      var background_grad;
      get_screen_size();
      score = 0;
      level = 1;
      difficultyRegulator = new DifficultyRegulator();
      requestAnimationFrame(AngleBall.loop);
      paddle = new Paddle({
        ctx: ctx,
        origin: {
          x: board.width / 2,
          y: board.height - 50
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
          y: board.height - 50
        },
        board: {
          height: window.innerHeight,
          width: window.innerWidth
        }
      });

      background_grad = back_ctx.createLinearGradient(0, 0, 0, board.height);
      background_grad.addColorStop(0, "#2e333a");
      background_grad.addColorStop(1, "#252733");
      back_ctx.fillStyle = background_grad;
      back_ctx.fillRect(0, 0, board.width, board.height);
    },

    pause: function() {
      pause = true;
    },

    unpause: function() {
      pause = false;
      this.loop();
    },

    game_over: function() {
      if(typeof(gameOverSound) != 'undefined'){
        gameOverSound.play({ playAudioWhenScreenIsLocked : false });
      }
      pause = true;
      this.set_best_score(score);
      $('#game').hide();
      $('#game_over_score').text(score);
      $('#game_over_level').text(level);
      $('#game_over_best').text(this.get_best_score());
      $('#game_over_menu').show();
    },

    set_best_score: function(score) {
      var store_score = window.localStorage.getItem('best_score');
      if(store_score == null || store_score < score){
        if(navigator.userAgent.indexOf('Android') >=0){
          //Android Gamecenter
        } else if(window.gamecenter) {
          gamecenter.submitScore(null, null, { score: score, leaderboardId: "angle_ball_leaderboard" });
        }
        window.localStorage.setItem('best_score', score);
      }
    },

    get_score: function() {
      return score;
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
        requestAnimationFrame(AngleBall.loop);
      }
    }
  }
})();
