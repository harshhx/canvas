

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var colorArray = [
  "#3ec1d3" ,
  "#f6f7d7" ,
  "#ff9a00" ,
  "#ff165d" ,
  "#bad7df" ,
] ;

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;

document.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

document.addEventListener("touch  ", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

});


function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random()*4)] ;
  this.minRadius = radius ;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color ;
    ctx.lineWidth = 3;
    ctx.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }

    } else if (this.radius > this.minRadius) {
      this.radius -= 1

    }

    this.draw();

  }
}

var circleArray = [];

for (var i = 0; i < 900; i++) {

  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var radius = Math.random()*3+ 1;
  var dx = (Math.random() - 0.5) * 5;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dy = (Math.random() - 0.5) * 5;
  circleArray.push(new Circle(x, y, dx, dy, radius));

}


function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
};
animate();

setTimeout(function(){ document.querySelector("h1").classList.add("invisible") }, 5000);
