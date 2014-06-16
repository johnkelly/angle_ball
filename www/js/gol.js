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
        x: 250,
        y: 350
      },
      paddle,
      frame_count = 0;
      balls       = [];

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
  }   

  function update() {
    for (var i = 0; i < balls.length; i++) {
      if (balls[i].outbound && balls.x == balls.end_x) {
        delete balls[i];
        balls.splice(i, 1);
      }
      balls[i].update(paddle.angle);
    }

    if (frame_count % 15000000 == 0) {
      var starting_x = NEWTON.rand(-board.width, board.width * 3);
      
      balls.push(new Ball({
        start_x: starting_x,
        start_y: -10,
        end_x: origin.x,
        end_y: board.height - 150,
        speed: 5
      }));

      balls[balls.length - 1].init({
        ctx: ctx
      });
    }

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

    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
    }
  }

  return {
    init: function() {
      get_screen_size();
      requestAnimationFrame(Gol.loop);
      paddle = new Paddle({
        ctx: ctx,
        origin: {
          x: origin.x,
          y: board.height - 150
        },
        canvas: board
      });
      paddle.init();
    },

    loop: function() {
      update();
      draw();
      paddle.draw();
      requestAnimationFrame(Gol.loop);
    }
  }
})();
  

$(document).ready(function() {
  Gol.init();    
});