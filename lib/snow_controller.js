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
            particles.push({
                    x: Math.random()*canvas.width, //between 0 and canvas width
                    y: 0,
                    speed: 2+Math.random()*3, //between 2 and 5
                    radius: 4+Math.random()*4, //between 5 and 10
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
        part.y += part.speed*drift;
    }
}

function updateParticlesX() {
    for(var i in particles) {
        var part = particles[i];
        // randomize direction
        direction = (Math.random() < 0.5 ? -1 : 1);
        part.xspeed += (Math.random() - 0.5 )*direction;
        // adjustment is necessary due to central limit theorem!
        if (part.xspeed > 5 || part.xspeed < -5) {
          part.xspeed = part.xspeed / 2;
        };
        part.x += (part.xspeed*drift + wind);
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