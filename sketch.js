var Fibonacci = [];
let centerX = 0;
let centerY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
	centerX = windowWidth*0.5;
	centerY = windowHeight*0.5;
  background(220);
}

function draw() {
  translate(centerX,centerY);
  //circle
  // x = 56;
  // y = 46;
  // w = 30;
  // h = 70; 
  // ellipse(x, y, w, h);
  
  //along fibonacchi curve
  noFill();
  stroke(1);
  noLoop();
  beginShape();
  for (let b = 1; b < 2; b +=1) {
    for (let a = 0; a < 50*PI; a += 0.1) {
      [x,y] = logarithmicSpiral(b,a);
      // push();
      // vertex(0, 0, xValue, yValue, 0 ,TWO_PI);
      // pop();      
      curveVertex(x, y);
      b*=1.025;
    }
  }
  endShape();
}


function logarithmicSpiral(radius,angle){
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