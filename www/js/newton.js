var NEWTON = {
  pyth: function(a, b) {
    return Math.pow( Math.pow(a, 2) + Math.pow(b, 2), .5);
  }, 

  rand: function(size) {
    var num = Math.floor(Math.random() * size);
    return num;
  },

  to_rad: function(degrees) {
    return degrees * Math.PI / 180;
  }, 

  to_deg: function(rads) {
    return rads * 180 / Math.PI;
  }
}
