window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var canvas = document.getElementById('canvas');
// dynamically set canvas size
    canvas.height = window.innerHeight - 150;
    canvas.width = window.innerWidth;
var particles = [];
var tick = 0;
var wind = 0;
var snow_amt = 200;
var drift = 1