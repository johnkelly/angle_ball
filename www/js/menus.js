open_pause_menu = function() {
  $('#menu_button').click(function(){
    Gol.pause();
    $('#game').hide();
    $('#pause_menu').show();
  })

  $('#unpause_button').click(function(){
    $('#pause_menu').hide();
    $('#game').show();
    Gol.unpause();
  })

  $('#restart_button').click(function(){
    $('#pause_menu').hide();
    $('#game').show();
    Gol.restart();
  })
}


$(document).ready(function() {
  open_pause_menu();
});
