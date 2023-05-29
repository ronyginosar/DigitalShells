// center position canvas
let centerX,centerY = 0;
let is3D = true;
let saveGif = false;
let z = 0;

var gui;


// todo 3d 
// todo zoom out
// todo export pngs
// todo  - can params change within the shell?
// todo bool alpha bg


let params = {
  // https://github.com/bitcraftlab/p5.gui/tree/master
  bgColor: '#d8ecf8',  

  isShellFlipped: false,
  isShellDoubleFlip: false,

  isDrawSpiralCurve : false,
  isDrawSpiralPoints: false,
  isDrawSpiralShapes: true,

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
  
  width_increase: 2,
  width_increaseMin : 0.1,
  width_increaseMax : 10,
  width_increaseStep: 0.1,

  height_increase: 1.8,
  height_increaseMin : 0.1,
  height_increaseMax : 10,
  height_increaseStep: 0.1,  

  fillShapeBackground: false,
  transparentBackground: false,

  // scale
  zoom: 1,
  zoomMin: 0.0001,
  zoomMax: 3,
  zoomStep: 0.0001,

}

function setup() {
  if(is3D){
    createCanvas(windowWidth, windowHeight, WEBGL);
  } else {
    createCanvas(windowWidth, windowHeight);
  }

  gui = createGui("Digital Shells");
  gui.addObject(params);

  // if (save){
  //https://github.com/tapioca24/p5.capture
  // or
  // https://www.npmjs.com/package/p5snap
  
  // }
}

function draw() {

  noLoop();
  if(params.transparentBackground){
    background(255,255,255,100); 
  } else {
    background(params.bgColor);
  }

  if (is3D){
    orbitControl();
    // TODO add y and x resolution
  } else {
    // calculate center here so resizeCanvas will move drawing
    centerX = windowWidth*0.5;
    centerY = windowHeight*0.5;
    translate(centerX,centerY); // move axis system to center screen
  }

  if (params.fillShapeBackground){
    // run twice, once for bg
    // todo support 3d
    fill(255);
    noStroke();
    drawSpiralFullEquation();
  }

  // settings for ellipses
  noFill();
  stroke(3);

  // calculate spiral and draw shapes using the full spiral equation
  drawSpiralFullEquation();

  // calculate spiral and draw shapes using the simplified spiral equation
  // drawSpiralRadiusAngle();
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

function increaseWH(){
  w += params.width_increase * params.zoom;
  h = w*params.height_increase * params.zoom;
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
  w = 1;
  h = 1;

  beginShape();
  // log spiral in radians is radius=a*exp(k*phi), 
  
  
    for (let angle = 0     ;
      angle < params.cycle_degrees;
      angle += params.increments ) 
    {
      spiral_constant = params.spiral_constant; // - spiral constant, initial radius
      // need a dummy here to not interfere with gui
      // feature make slider neg instead of flip box

      if (params.isShellFlipped){
        // flip is based upon the spiral constant sign
        spiral_constant *= -1; 
      }

      // polar slope (growth factor, rate of increase of the spiral) 
      // polar slope angle to polar slope: k = tan(alpha)
      // alpha is the angle between any line R from the origin and the line tangent to the spiral which is at the point where line R intersects the spiral. 
      // alpha is a constant for any given logarithmic spiral.
      // golden/fibonacci will be alpha = +- 17. 
      polar_slope = tan(degreesToRadians(params.polar_slope));
      
      // phi the angle of rotation, is located between two lines drawn from the origin to any two points on the spiral.
      phi = degreesToRadians(angle);

            // exp(k*phi) -> ratio of the lengths between two lines that extend out from the origin. (the log part)

      r = spiral_constant * exp(polar_slope * phi);

            // log spiral in cartesian form: x=r*cos(phi)=a*e^(k*phi)*cos(phi)

      [x,y] = locationUponLogarithmicSpiral(r * params.zoom, phi, flip=params.isShellDoubleFlip);

      // TODO zoom
      x *= params.zoom;
      y *= params.zoom;

      if (is3D){
        translate(1,1,z);
        // z += 1;
      }
      if (params.isDrawSpiralPoints){
        point(x,y);
      }
      if (params.isDrawSpiralCurve){
        curveVertex(x,y);
      }
      if (params.isDrawSpiralShapes){
        // draw ellipses along Fibonacci curve
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


// feature click to disappear gui
// feature beautify gui with css
// feature colors of shape
// feature ellipseMode(CORNER)
// feature "ismobile" https://p5js.org/reference/#/p5/deviceMoved
// feature Curvature = cos(alfa)/r

