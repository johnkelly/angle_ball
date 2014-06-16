var NEWTON = {
  pyth: function(a, b) {
    return Math.pow( Math.pow(a, 2) + Math.pow(b, 2), .5);
  }, 

  rand: function(min, max) {
    return Math.floor(Math.random() * max + min);
  },

  to_rad: function(degrees) {
    return degrees * Math.PI / 180;
  }, 

  to_deg: function(rads) {
    return rads * 180 / Math.PI;
  }
}