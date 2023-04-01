var Fibonacci = [];
let m=0.2;
// r = 1;
// angle = 1;

function setup() {
  createCanvas(400, 400);
  background(220);
  // b=a*(abs(exp(2*m*PI))-1)/(exp(2*m*PI)+1)*sqrt(1+k*k);
  b=10;
}

function draw() {
  
  translate(400/2, 400/2); // width height larger in vscode
  // t=frameCount/200;
  t=30;

  //circle
  // x = 56;
  // y = 46;
  // w = 30;
  // h = 70; 
  // ellipse( x, y, w, h);
  
  //along fibonacchi curve
  noFill();
  stroke(1);
  // [xValue, yValue] = logarithmicSpiral(r,angle);
  // point(xValue, yValue);
  // r += 1;
  // angle +=1;

  // let increment = 1;
  // noLoop();
  // beginShape();
  // for (let a = 1; a < TWO_PI; a += increment) {
  //   for (let r = 10; r < 100; r += increment) {
  //     // r=100;
  //     [xValue, yValue] = logarithmicSpiral(r,a);
  //     // arc(0, 0, xValue, yValue, 0 ,TWO_PI);
  //     point(xValue, yValue);
  //   }
  // }
  // endShape(CLOSE);

  beginShape();
  shell1();
  endShape();

}

function logarithmicSpiral(radius,angle){
 // maybe use r = a * exp(-b * t)
 // https://mathworld.wolfram.com/LogarithmicSpiral.html
  x = radius * cos(angle);
  y = radius * sin(angle);
  return [x,y];
}

function shell1(){
  // https://openprocessing.org/sketch/1569578
  for(let a=0;a<2*PI;a+=0.1){
    for(let t= 0;t<9*PI;t+=0.1){
      // a = 40;
      x=(cos(a+t)*exp(t)*cos(t));
      y=(cos(a+t)*exp(t)*sin(t));
      push();
      point(x,y);
      pop();
     
    }
    
  }
}

// https://twitter.com/a_mcsquared/status/1156588986493743104
// Sequence(Ellipse((0.1t π / 100; t π / 100), (1.9t π / 100; t π / 100), t π / 100), t, 0, 250)
