var Fibonacci = [];
let m=0.2;
// r = 1;
// angle = 1;

function setup() {
  createCanvas(400, 400);
  background(220);
  // b=a*(abs(exp(2*m*PI))-1)/(exp(2*m*PI)+1)*sqrt(1+k*k);
  b=10;
  xValue1 = 0;
  yValue1 = 0;
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
  // noFill();
  stroke(1);
  // [xValue, yValue] = logarithmicSpiral(r,angle);
  // point(xValue, yValue);
  // r += 1;
  // angle +=1;

  // let increment = 0.1;
  noLoop();
  // beginShape();

  // for (let r = 0; r < 50; r += 1) {
  //   for (let a = 0; a < TWO_PI; a += 1) {
  //     // r=10;
  //     // a = 50;
  //     [xValue2, yValue2] = logarithmicSpiral(r,a);
  //     // vertex(0, 0, xValue, yValue, 0 ,TWO_PI);
  //     // push();
  //     // point(xValue2, yValue2);
  //     line(xValue1, yValue1, xValue2, yValue2);
  //     xValue1 = xValue2;
  //     yValue1 = xValue2;
  //     // pop();
  //   }
  // }
  // endShape(CLOSE);

  // print("hi");

  // beginShape();
  // shell2();
  // endShape();

  // logarithmicSpiral(3,40);

  const b = 10;

    beginShape();
    for(let theta = 1; theta < 5*PI ; theta += 0.1) {
        [x, y] = polarToCartesian(b * theta, theta);
        point(x, y);
    }
    endShape();

}

function polarToCartesian(r, theta) {
  // return {
  x= r * cos(theta);
  y= r * sin(theta);
  // };
  return [x,y];
}

function logarithmicSpiral(radius,angle){
 // maybe use r = a * exp(-b * t)
 // https://mathworld.wolfram.com/LogarithmicSpiral.html
  x = radius * cos(angle);
  y = radius * sin(angle);
  return [x,y];

  // angle = (i++) * PI/180;
  // x2 = radius * cos(angle) + width/2;
	// y2 = radius * sin(angle) + height/2;
}

function shell1(){
  // https://openprocessing.org/sketch/1569578
  for(let a=0;a<2*PI;a+=10){
    for(let t= 0;t<9*PI;t+=0.1){ // inc controls resolution between points
      // a = 45;
      // t = 5;
      x=(cos(a)+t *exp(t)*cos(t));
      y=(cos(a)*exp(t)*sin(t));
      push();
      point(x,y);
      pop();
     
    }
    
  }

  // for(let a=0;a<2*PI;a+=0.1){
  //   for(let t= 0;t<9*PI;t+=0.1){
  //     // a = 45;
  //     // t = 5;
  //     x=(cos(a+t)*exp(t)*cos(t));
  //     y=(cos(a+t)*exp(t)*sin(t));
  //     push();
  //     point(x,y);
  //     pop();
     
  //   }
    
  // }
}

function shell2(){
  // https://openprocessing.org/sketch/1569578
  for(let t= 0;t<1;t+=1){
    // for(let a=-30;a<(2*PI-30);a+=(0.1*PI)){
    for(let a=0;a<(2*PI);a+=(0.1*PI)){
    // for(let a=0;a<=90;a+=10){
      // inc controls resolution between points
      // a = 0;
      // t = 5;

      print("a is " + a + "t is " + t);
      x=(cos(a)*exp(t)*cos(t));
      y=(cos(a)*exp(t)*sin(t));
      // push();
      point(x,y);
      // pop();
    }
  }
}




// https://twitter.com/a_mcsquared/status/1156588986493743104
// Sequence(Ellipse((0.1t π / 100; t π / 100), (1.9t π / 100; t π / 100), t π / 100), t, 0, 250)
