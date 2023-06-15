
//Constants

let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(50, 50, 80);
  fill(255,0,0)
  noStroke()
  

}

function draw() {
  background(220);
  
  ball.gravity()
  ball.render()
  ball.edges()
  ball.friction()
  ball.update()
  
}

function mouseMoved() {
  if(frameCount > 120) {
    ball.attract()
  }

}


class Ball {
  constructor(x, y, size) {
    this.p = createVector(x,y);
    this.size = size;
    this.v = createVector(0, 0);
    this.a = createVector(0,0);
  }

  gravity() {
    this.a.add(createVector(0,1))
  }

  update() {
    this.v.add(this.a);
    this.p.add(this.v);
    this.a.setMag(0)
  }

  edges() {
    if(this.p.y + this.size/2 >= height) {
      this.p.y = height - this.size/2;
      this.v.y *= -1;
    }
    if(this.p.x - this.size / 2 < 0) {
      this.p.x =  0 + this.size / 2;
      this.v.x *= -1;
    }
    if(this.p.x + this.size / 2 > width) {
      this.p.x =  width - this.size / 2;
      this.v.x *= -1;
    }
  }

  friction() {
    this.v.mult(0.98)
  }

  attract() {
    const mouse = createVector(mouseX, mouseY);
    const fromBallToMouse = p5.Vector.sub(this.p, mouse);
    fromBallToMouse.normalize();
    fromBallToMouse.mult(-2);
    this.a.add(fromBallToMouse)
  }

  render() {
    ellipse(this.p.x, this.p.y, this.size);
  }
}

