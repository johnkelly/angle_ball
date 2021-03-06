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
    } else if(score >= 10 && score < 15){
      this.level = 4;
    } else if(score >= 15 && score < 20){
      this.level = 5;
    } else if(score >= 20 && score < 25){
      this.level = 6;
    } else if(score >= 25 && score < 30){
      this.level = 7;
    } else if(score >= 30 && score < 50){
      this.level = 8;
    } else if(score >= 50){
      this.level = 9;
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
      new_width = this._calculate_new_width(net.width);


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

  adjust_speed: function(ballRegulator) {
    if(this.level_changed && this.level > 7){
      ballRegulator.speed +=1
    }
  },

  _calculate_new_width: function(width) {
    switch(this.level) {
      case 1:
        return width;
        break;
      case 2:
        return width;
        break;
      case 3:
        return (width * .90);
        break;
      case 4:
        return (width * .85);
        break;
      case 5:
        return (width * .80);
        break;
      case 6:
        return (width * .75);
        break;
      case 7:
        return (width * .70);
        break;
      case 8:
        return (width * .70);
        break;
      case 9:
        return (width * .70);
        break;
    }
  }
}
