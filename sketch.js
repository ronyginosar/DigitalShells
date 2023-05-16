// center position canvas
let centerX = 0;
let centerY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
	centerX = windowWidth*0.5;
	centerY = windowHeight*0.5;
  background(200);
}

function draw() {
  translate(centerX,centerY);
  noLoop();

  // settings for ellipses
  noFill();
  stroke(3);
  // ellipseMode(CORNER);


  // vars of ellipses
  w = 1;
  h = 1;


  // TODO optional later is using the following instead of r loop:
        // radius = a*exp(k*theta)
        // curvature = (cos(alpha)/r), with k=tan(alpha)

  cycle_degrees = 360; // change to lower for 'cake slices'

  //draw ellipses along Fibonacci curve
  beginShape();
    for (let angle = 0           , radius = 0;
        angle < cycle_degrees    , radius < 100;
        angle += 6               , radius +=1) 
    {
      // helperCircle(radius);
      rad = degreesToRadians(angle); // logarithmicSpiral is based on radians
      // convert the r,a to x,y
      [x,y] = locationUponLogarithmicSpiral(radius,rad,flip=true);
      // draw spiral curve or just points:
      // curveVertex(x, y);
      point(x,y);
      // draw ellipses along curve
      // ellipse(x, y, w, h);
      w +=2;
      h = w*1.8;
    }
  endShape();
}

function degreesToRadians(degrees){
  // 1° * π/180 
  radians = degrees * PI/180;
  return radians;
}

function helperCircle(radius){
  // logarithmic spiral and an expanding circle centred 
  // at the origin to demonstrate that the angle between 
  // the tangents of the two curves at the points of 
  // intersection remains constant. 
  // https://en.wikipedia.org/wiki/File:Logspiral.gif
  push();
  ellipseMode(RADIUS);
  ellipse(0,0,radius);
  pop();
}

function locationUponLogarithmicSpiral(radius,angle,flip=true){
 // https://mathworld.wolfram.com/LogarithmicSpiral.html
 // log spiral in radians is radius=a*exp(k*phi), k = tan(alpha) -> polar slope (polar slope angle)
 // in cartesian: x=r*cos(phi)=a*e^(k*phi)*cos(phi)
 // constant a is the rate of increase of the spiral
 

if (flip){
   // flip sin and cos for a flipped spiral
    x = radius * sin(angle);
    y = radius * cos(angle);
} else {
    y = radius * sin(angle);
    x = radius * cos(angle);
}
return [x,y];
}
