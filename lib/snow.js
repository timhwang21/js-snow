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
var snow_amt = 250;
var drift = 1

/////////////////////////////////////////

// controller for wind
var $submitButtonWindSlow = $('#submit-button-wind-slow');
$submitButtonWindSlow.on('click', function () {
  wind -= 1;
  $('.wind').html(wind);
});

var $submitButtonWindFast = $('#submit-button-wind-fast');
$submitButtonWindFast.on('click', function () {
  wind += 1;
  $('.wind').html(wind);
});

// controller for snow amt

var $submitButtonSnowAmtLess = $('#submit-button-snow-amt-less');
$submitButtonSnowAmtLess.on('click', function () {
  snow_amt -= 10;
  $('.snow_amt').html(snow_amt);
  if (snow_amt == 10) {
    $submitButtonSnowAmtLess.prop('disabled', true);
  };
});

var $submitButtonSnowAmtMore = $('#submit-button-snow-amt-more');
$submitButtonSnowAmtMore.on('click', function () {
  snow_amt += 10;
  $('.snow_amt').html(snow_amt);
  if (snow_amt >= 10) {
    $submitButtonSnowAmtLess.prop('disabled', false);
  };
});

// controller for drift

var $submitButtonDriftLess = $('#submit-button-drift-less');
if (drift == 1) {
  $submitButtonDriftLess.prop('disabled', true);
};
$submitButtonDriftLess.on('click', function () {
  drift -= 1;
  $('.drift').html(drift);
  if (drift == 1) {
    $submitButtonDriftLess.prop('disabled', true);
  };
});

var $submitButtonDriftMore = $('#submit-button-drift-more');
$submitButtonDriftMore.on('click', function () {
  drift += 1;
  $('.drift').html(drift);
  if (drift >= 1) {
    $submitButtonDriftLess.prop('disabled', false);
  };
});

/////////////////////////////////////////

function loop() {
    window.requestAnimFrame(loop);
    resizeCanvas();
    createParticles();
    updateParticlesY();
    updateParticlesX();
    killParticles();
    drawParticles();
}
window.requestAnimFrame(loop);

function createParticles() {
    //check on every 10th tick check
    if (tick % 10 == 0) {
        //add particle if fewer than 100
        if (particles.length < snow_amt) {
            radius = 1+Math.random()*5;
            particles.push({
                    x: Math.random()*canvas.width, //between 0 and canvas width
                    y: 0,
                    speed: Math.random()*3 + radius*2,
                    radius: radius, //between 5 and 10
                    color: "white",
                    xspeed: (Math.random() - 0.5 ),
            });
        }
        while (particles.length >= snow_amt) {
            particles.pop(10);
        }
    }
}

function updateParticlesY() {
    for(var i in particles) {
        var part = particles[i];
        part.y += part.speed*drift/2;
    }
}

function updateParticlesX() {
    for(var i in particles) {
        var part = particles[i];
        // randomize direction
        direction = (Math.random() < 0.5 ? -1 : 1);
        part.xspeed += (Math.random() - 0.5)*direction;
        // adjustment is necessary due to central limit theorem!
        if (part.xspeed > 5 || part.xspeed < -5) {
          part.xspeed = part.xspeed / 2;
        };
        part.x += (part.xspeed*drift/2 + wind*part.radius);
    }
}

function killParticles() {
    for(var i in particles) {
        var part = particles[i];
        if(part.y > canvas.height + 10) {
            part.y = 0;
        }
        if(part.x > canvas.width + 10) {
            part.x = 0;
            part.y = Math.random() * canvas.height;
        }
        if(part.x < -10) {
            part.x = canvas.width;
            part.y = Math.random() * canvas.height;
        }
    }
}

function drawParticles() {
    var c = canvas.getContext('2d');
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
    for(var i in particles) {
        var part = particles[i];
        c.beginPath();
        c.arc(part.x,part.y, part.radius, 0, Math.PI*2);
        c.closePath();
        c.fillStyle = part.color;
        c.fill();
    }
}

function resizeCanvas () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 150;
}

// particles class -- push new particles into particles array
// store "global" stuff in "environment" & manipulate that
