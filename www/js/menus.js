open_pause_menu = function() {
  $('#menu_button').on('click', function(event, ui) {
    Gol.pause();
    $('#game').hide();
    $('#pause_menu').show();
    $('#start_button').hide();
  })

  $('#start_button').on('click', function(event, ui) {
    $('#start_button').hide();
    Gol.start();
  })

  $('#unpause_button').on('click', function(event, ui) {
    $('#start_button').hide();
    $('#pause_menu').hide();
    $('#game').show();
    Gol.unpause();
  })

  $('.restart_button').on('click', function(event, ui) {
    $('#game_over_menu').hide();
    $('#start_button').hide();
    $('#pause_menu').hide();
    $('#game').show();
    Gol.restart();
  })
  $('.leaderboard_button').on('click', function(event, ui) {
    gamecenter.showLeaderboard(null, null, { period: "today", leaderboardId: "main_leaderboard" });
  })
}
