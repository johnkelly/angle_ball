function DifficultyRegulator() {
  this.level = 1;
  this.level_changed = false;
}

DifficultyRegulator.prototype = {
  get_level: function(score, level){
    var current_level = level;
    if(score > 0 && score < 5){
      this.level = 2;
    } else if(score >= 5 && score < 10){
      this.level = 3;
    } else if(score >= 10 && score < 50){
      this.level = 4;
    } else if(score >= 50 && score < 100){
      this.level = 5;
    } else if(score >= 100 && score < 500){
      this.level = 6;
    } else if(score >= 500){
      this.level = 7;
    } else {
      this.level = 1;
    }
    this.level_changed = (current_level != this.level)
    return this.level;
  },

  draw: function(config) {
    if(this.level == 1) {
      config.ballRegulator.draw_trajectories();
    }
  },

  adjust_net: function(net) {
    if(this.level_changed){
      new_width = this._calculate_new_width();


      new_net = new Net({
        ctx: net.ctx,
        origin_x: net.origin_x,
        width: new_width
      });

      delete net;
      return new_net;
    }
    return net;
  },

  _calculate_new_width: function() {
    switch(this.level) {
      case 1:
        return 200;
        break;
      case 2:
        return 200;
        break;
      case 3:
        return 150;
        break;
      case 4:
        return 100;
        break;
      case 5:
        return 75;
        break;
      case 6:
        return 50;
        break;
      case 7:
        return 10;
        break;
    }
  }
}
