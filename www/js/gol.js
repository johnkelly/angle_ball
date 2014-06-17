var Gol =  (function() {
  var game_width  = 500,
      game_height = 700,
      board       = document.getElementById('gameboard'),
      ctx         = board.getContext('2d'),
      screen_width, screen_height,
      goal_width  = 200,
      score       = 0,
      level       = 1,
      origin      = {
        x: 500,
        y: 350
      },
      paddle,
      frame_count = 0;
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

  function get_screen_size() {
    var w = 0,
        h = 0;

    board.width = w = window.innerWidth;
    board.height = h = window.innerHeight;

    origin.x = ballRegulator.origin_x = Math.floor(w / 2);
    origin.y = ballRegulator.origin_y = Math.floor(h / 2);

    return {
      width: screen_width,
      height: screen_height
    }
  }   

  function update() {
    ballRegulator.reap();
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
    ctx.fillText("Score: " + score, 20, 20);
    ctx.fillText("Level: " + level, 100, 20);
    ctx.fillRect(origin.x - goal_width / 2, 50, goal_width, 35);

    ctx.fillRect(origin.x, origin.y, 4, 4);

    ballRegulator.draw(paddle.angle);
    paddle.draw();
  }

  return {
    init: function() {
      get_screen_size();
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
    },

    loop: function() {
      update();
      draw();
      requestAnimationFrame(Gol.loop);
    }
  }
})();
  

$(document).ready(function() {
  Gol.init();    
});
