// center position canvas
let centerX = 0;
let centerY = 0;
let slider_1;
let slider_2;
let slider_3;

function setup() {
  createCanvas(windowWidth, windowHeight);
	centerX = windowWidth*0.5;
	centerY = windowHeight*0.5;
  background(200);
  slider_1 = drawSlider(1);
  // slider_2 = drawSlider(2);
  // slider_3 = drawSlider(3);
}

function drawSlider(idx, min=0, max=80, val=10, step=1){
  let slider = createSlider(min, max, val, step);
  slider.position(10, 20*idx);
  slider.style('width', '380px');
  
  let label = createSpan(slider.value());
  label.position(slider.x + slider.width + 10, slider.y);
  let onInput = () => {
    label.html(slider.value());
  };

  slider.input(onInput);
  return slider
}

function draw() {
  translate(centerX,centerY);
  noLoop();

  // settings for ellipses
  noFill();
  stroke(3);
  // ellipseMode(CORNER);

  cycle_degrees = 360; // change to lower for 'cake slices'
  // polar_slope = 10;

  //draw ellipses along Fibonacci curve
  // drawSpiralRadiusAngle(cycle_degrees);

  drawSpiralFullEquation();
}

function mouseReleased() {
  redraw();
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

function drawSpiralRadiusAngle(cycle_degrees){
  w = 1;
  h = 1;
  beginShape();
  for (let angle = 0           , radius = 0;
      angle < cycle_degrees    , radius < 100;
      angle += 6               , radius +=1) 
  {
    // angle = 30; // single angle for single line
    // helperCircle(radius);
    rad = degreesToRadians(angle); // logarithmicSpiral is based on radians
    // convert the r,a to x,y
    [x,y] = locationUponLogarithmicSpiral(radius,rad,flip=true);
    // draw spiral curve or just points:
    // curveVertex(x, y);
    // point(x,y);
    // draw ellipses along curve
    ellipse(x, y, w, h);
    w +=2;
    h = w*1.8;
  }
  endShape();
}

function drawSpiralFullEquation(){
  w = 1;
  h = 1;
  beginShape();
  // log spiral in radians is radius=a*exp(k*phi), k = tan(alpha) -> polar slope (polar slope angle)
  // in cartesian: x=r*cos(phi)=a*e^(k*phi)*cos(phi)
    for (let angle = 0           ;
      angle < cycle_degrees;
      angle += 10          ) 
    {
      // radius=a*exp(k*phi)
      a = -5; // flip will be based upon a sign. "rate of increase of the spiral"
      alfa = slider_1.value(); // polar slope angle
      k = tan(degreesToRadians(alfa)); // polar slope
      phi = degreesToRadians(angle);
      radius = a*exp(k*phi);
      [x,y] = locationUponLogarithmicSpiral(radius, phi, flip=false);
      // point(x,y);
      // curveVertex(x,y);
      ellipse(x, y, w, h);
      w +=2;
      h = w*1.8;
    }
  endShape();
}