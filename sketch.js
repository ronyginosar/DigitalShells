// center position canvas
let centerX,centerY = 0;
// let centerY = 0;
// let slider_polar_slope;
// let slider_spiral_constant;
// let slider_cycle_degrees;
// let slider_increments;
// let box_shell_flip;
// let box_shell_flip_double;
let w_increase = 2;
let h_increase = 1.8;
let w,h = 1;
// let h = 1;
let cycle_degrees = 360; // change to lower for 'cake slices'
let is3D = false;
let saveGif = false;
// let guiY = 1;


var visible = true;
var gui;
// var bgColor = '#ebe6f5';



let params = {

  bgColor: '#ebe6f5',  

  isShellFlipped: false,
  isShellDoubleFlip: false,

  isDrawSpiralCurve :   false,
  isDrawSpiralPoints:   false,
  isDrawSpiralShapes:   true,

  polar_slope:8.034,
  polar_slopeMin:0,
  polar_slopeMax:50,
  polar_slopeStep:0.01,

  spiral_constant: 36.34,
  spiral_constantMin : 0.034,
  spiral_constantMax : 50,
  spiral_constantStep: 0.01,

  increments: 3,
  incrementsMin : 0,
  incrementsMax : 15,
  incrementsStep: 0.5,

  cycle_degrees: 360,
  cycle_degreesMin : 0,
  cycle_degreesMax : 360*10,
  cycle_degreesStep: 10,  
}

// feature "ismobile" https://p5js.org/reference/#/p5/deviceMoved
// todo 3d 
// todo zoom out
// todo gui
// todo more params?
// todo export pngs
// todo  - can params change within the shell?

function setup() {
  if(is3D){
    createCanvas(windowWidth, windowHeight, WEBGL);
  } else {
    createCanvas(windowWidth, windowHeight);
  }
  
	centerX = windowWidth*0.5;
	centerY = windowHeight*0.5;
  guiY = windowHeight*0.7 ;
  // slider_polar_slope = drawSlider(1,0.034,50,8.34,0.01);
  // slider_spiral_constant = drawSlider(2,0.034,50,36.34,0.01);
  // slider_cycle_degrees = drawSlider(3, 0, 360*10, 360, 10);
  // slider_increments = drawSlider(4, 0, 15, 3, 0.5);
  // box_shell_flip = drawCheckBox(5, 'flip');
  // box_shell_flip_double = drawCheckBox(6, 'double flip');

  // gui = createGui();
  // gui.addGlobals('bgColor', 'isShellFlipped', 'isShellDoubleFlip');

  gui = createGui();
  gui.addObject(params);

  // if (saveGif){
  //   // see link for full needs
  //   // https://www.npmjs.com/package/p5.createloop
  //   // frameRate(30)
  //   // createLoop({duration:3, gif:true})
  //   
  // }
}

function drawSlider(idx, min=0, max=80, val=10, step=1){
  let slider = createSlider(min, max, val, step);
  slider.position(10, guiY + 20*idx);
  slider.style('width', '180px');
  
  let label = createSpan(slider.value());
  label.position(slider.x + slider.width + 10, slider.y);
  let onInput = () => {
    label.html(slider.value());
  };
  slider.input(onInput);
  return slider
}

function drawCheckBox(idx, txt){
  checkbox = createCheckbox(txt, false);
  checkbox.changed(changeCheckBox);
  checkbox.position(10, guiY + 20*idx+5);
  return checkbox;
}

function draw() {
  translate(centerX,centerY);
  noLoop();
  
  background(params.bgColor);

  if (is3D){
    orbitControl();
  }

  // settings for ellipses
  noFill();
  stroke(3);
  // ellipseMode(CORNER);

  // draw ellipses along Fibonacci curve
  // drawSpiralRadiusAngle();
  

  drawSpiralFullEquation();

  
}

function mouseReleased() {
  redraw();
}

// function changeCheckBox(){
  if (box_shell_flip_double.checked())
  {
    isShellDoubleFlip = true;
  } else {
    isShellDoubleFlip = false;
  }
  if (box_shell_flip.checked()){
    params.isShellFlipped = true;
  } else {
    params.isShellFlipped = false;
  }
  redraw();
// }

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

function increaseWH(){
  w += w_increase;
  h = w*h_increase;
}

function drawSpiralRadiusAngle(){
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
    increaseWH();
  }
  endShape();
}

function drawSpiralFullEquation(){
  w = 1; // TODO slider these
  h = 1;

  cycle_degrees = params.cycle_degrees;
  angle_increments = params.increments;

  beginShape();
  // log spiral in radians is radius=a*exp(k*phi), 
  
  
    for (let angle = 0     ;
      angle < cycle_degrees;
      angle += angle_increments ) 
    {
      // radius=a*exp(k*phi)
      // exp(k*phi) -> ratio of the lengths between two lines that extend out from the origin. (the log part)
      spiral_constant = params.spiral_constant; // - spiral constant, initial radius

      if (params.isShellFlipped){
        // flip is based upon the spiral constant sign
        spiral_constant *= -1; 
      }
      polar_slope_angel = params.polar_slope; // alpha - polar slope angle - golden/fibonacci will be +- 17. "rate of increase of the spiral"
      // alfa the angle between any line R from the origin and the line tangent to the spiral which is at the point where line R intersects the spiral. α is a constant for any given logarithmic spiral.
      // k = tan(alpha) -> polar slope (polar slope angle)

      // Curvature = cos(alfa)/r
      polar_slope = tan(degreesToRadians(polar_slope_angel)); // k - polar slope, growth factor
      
      // phi the angle of rotation, is located between two lines drawn from the origin to any two points on the spiral.
      phi = degreesToRadians(angle);

      // log spiral in cartesian form: x=r*cos(phi)=a*e^(k*phi)*cos(phi)
      r = spiral_constant * exp(polar_slope * phi);

      [x,y] = locationUponLogarithmicSpiral(r, phi, flip=params.isShellDoubleFlip);

      if (params.isDrawSpiralPoints){
        point(x,y);
      }
      if (params.isDrawSpiralCurve){
        curveVertex(x,y);
      }
      if (params.isDrawSpiralShapes){
        ellipse(x, y, w, h);
      }
      increaseWH();
    }
  endShape();
}

// dynamically adjust the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}