var Fibonacci = [];
let m=0.2;
// r = 1;
// angle = 1;
let centerX = 0;
let centerY = 0;

function setup() {

  background(220);
  // b=a*(abs(exp(2*m*PI))-1)/(exp(2*m*PI)+1)*sqrt(1+k*k);
  b=10;
  xValue1 = 0;
  yValue1 = 0;

  createCanvas(windowWidth, windowHeight);
	centerX = windowWidth*0.5;
	centerY = windowHeight*0.5;
}

function draw() {
  translate(centerX,centerY);
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

  // let increment = 0.1;
  noLoop();
  // beginShape();

  // for (let r = 0; r < 50; r += 1) {
  for (let b = 1; b < 2*PI; b +=1) {
    // b = 1;
    for (let a = 0; a < 5*PI; a += 0.1) {
      // r=10;
      // a = 50;
      [x,y] = logarithmicSpiral(b,a);
      // vertex(0, 0, xValue, yValue, 0 ,TWO_PI);
      // push();
      // point(xValue2, yValue2);
      // line(xValue1, yValue1, xValue2, yValue2);
      // xValue1 = xValue2;
      // yValue1 = xValue2;
      // pop();
      [x, y] = polarToCartesian(b * a, a);
      point(x, y);
      b*=1.025;
    }
  }
  endShape();

  // print("hi");

  // beginShape();
  // shell2();
  // endShape();


  // const b = 10;

  //   beginShape();
  //   for(let theta = 1; theta < 4*PI ; theta += 0.1) {
  //       [x, y] = polarToCartesian(b * theta, theta);
  //       point(x, y);
  //   }
  //   endShape();

}

function polarToCartesian(r, theta) {
  x = r * cos(theta);
  y = r * sin(theta);
  return [x,y];
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


// function draw() {
// 	//circle(mouseX, mouseY, 20);
// 	push()
// 	translate(width/2, height/2)
// 	circle(
// 		r*sin(frameCount/10),
//     r*cos(frameCount/10),
// 		10
// 		)
// 	r++
// 	pop()
// }