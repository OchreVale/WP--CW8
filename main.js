let ball = {
    x: 10,
    y: 10,
    xInc: 3,
    yInc: 3,
    scale: 1,
    img: document.getElementById("basketball"),
    rotation: 0,
    // Draw the ball
    draw: function() {
    const centerX= (this.x + this.img.width) / 2
    const centerY= (this.y + this.img.height) / 2
    this.rotation+=0.01;
    context.translate(centerX, centerY);
    context.rotate(this.rotation*Math.PI/180)
    context.scale(this.scale, this.scale)
    context.rotate(this.rotation)
    context.translate(-centerX, -centerY);
    context.drawImage(this.img, this.x, this.y);
    },
    // Move the ball
    move: function() {
    this.y += this.yInc;
    this.x += this.xInc;
    if (this.x < 0 || this.x + this.img.width > canvas.width) {
    this.xInc *= -1;
    if (this.scale<1.5){
        this.scale +=0.1;  
    }
    else{
        this.scale=1;
    }

    }

    if (this.y<0 || this.y+this.img.height > canvas.height){
        this.yInc *=-1;
        if (this.scale<1.5){
            this.scale +=0.1;  
        }
        else{
            this.scale=1;
        }
    }
    }
};
   let canvas = document.getElementById("myCanvas");
   let context = canvas.getContext("2d");
   // Draw ball at starting position
   context.save();
   ball.draw();
   context.restore();
   // Used to cancel animation
   let animFrameId;
   // Start the animation when the mouse is on the canvas
   canvas.addEventListener("mouseover", function(e) {
    animFrameId = window.requestAnimationFrame(drawFrame);
   });
   // Stop the animation when the mouse is moved off the canvas
   canvas.addEventListener("mouseout", function(e) {
    window.cancelAnimationFrame(animFrameId);
   });

   // Draw a single frame
function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    ball.draw();
    ball.move();
    context.restore();
    animFrameId = window.requestAnimationFrame(drawFrame);
   }