open_pause_menu = function() {
  $('#menu_button').on('click', function(event, ui) {
    AngleBall.pause();
    $('#game').hide();
    $('#pause_menu').show();
    $('#start_button').hide();
  })

  $('#start_button').on('click', function(event, ui) {
    $('#start_button').hide();
    AngleBall.start();
  })

  $('#unpause_button').on('click', function(event, ui) {
    $('#start_button').hide();
    $('#pause_menu').hide();
    $('#game').show();
    AngleBall.unpause();
  })

  $('.restart_button').on('click', function(event, ui) {
    $('#game_over_menu').hide();
    $('#start_button').hide();
    $('#pause_menu').hide();
    $('#game').show();
    AngleBall.restart();
  })

  $('.leaderboard_button').on('click', function(event, ui) {
    gamecenter.showLeaderboard(null, null, { period: "today", leaderboardId: "angle_ball_leaderboard" });
  })
}

open_instructions = function() {
  $('#game_over_menu').hide();
  $('#start_button').hide();
  $('#pause_menu').hide();
  $('#game').show().css('opacity', .9);
  $('.instructions').show();

  $('.dismiss_instructions').on('click', function(event, ui) {
    app.set_has_read_instructions();
    $('#start_button').show();
    $('.instructions').hide();
    $('#game_over_menu').hide();
    $('#pause_menu').hide();
    $('#game').show().css('opacity', 1);
  })
}
