let centerX,centerY = 0; // center position canvas
let saveGif = false;
var gui; // double click to disappear gui
var gui_3d; // double click to disappear gui
let serial_array = [];


// todo export pngs
// todo  - can params change within the shell?
// todo make 3d more dense
// todo make more shapes?

let params = {
  // https://github.com/bitcraftlab/p5.gui/tree/master
  bgColor: '#d8ecf8',  

  isShellFlipped: true,
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

  is3D: false,

  z_increment:5,
  z_incrementMin:0.1,
  z_incrementMax:10,
  z_incrementStep:0.1,

}

// let params_3d = {

//   z_increment:5,
//   z_incrementMin:0.1,
//   z_incrementMax:10,
//   z_incrementStep:0.1,

// }

//   isShellFlipped: true,
//   isShellDoubleFlip: false,
//   isDrawSpiralCurve : false,
//   isDrawSpiralPoints: false,
//   isDrawSpiralShapes: true,
//   polar_slope:8.034,
//   spiral_constant: 36.34,
//   increments: 3,
//   cycle_degrees: 360,  
//   width_increase: 2,
//   height_increase: 1.8,
//   fillShapeBackground: false,
//   transparentBackground: false,
//   is3D: false,
//   z_increment:5,

P5Capture.setDefaultOptions({
  format: "png",
  framerate: 10,
  // quality: 0.5,
  width: 320,
});

function imageFilename(index) {
  return serial_array.toString().padStart(7, "0");
}

function setup() {
  frameRate(10);
  createCanvas(windowWidth, windowHeight, WEBGL);

  gui = createGui("Digital Shells");
  gui.addObject(params);
  // params.serial="${params.polar_slope}";

  // serial number 
  for (let k in params) {
    if (k.includes("Max") || k.includes("Min") || k.includes("Step") ){
      // pass sliders
    } 
    else if (k.includes("bgColor")) {
      // pass color
    }
    else if (params[k] == true){
      console.log(k + ' is ' + 1);
      serial_array.push("1");
    }
    else if (params[k] == false){
      console.log(k + ' is ' + 0);
      serial_array.push("0");
    }
    else {
      console.log(k + ' is ' + params[k]);
      serial_array.push(str((params[k])));
    }
  }
  console.log(serial_array);



  // if (save){
  //https://github.com/tapioca24/p5.capture
  // or
  // https://www.npmjs.com/package/p5snap
  // }
}

function draw() {
  serial_array = [];
  // noLoop(); // --> kills orbitControl
  if(params.transparentBackground){
    background(255,255,255,100); 
  } else {
    background(params.bgColor);
  }
  orbitControl();



  if (params.fillShapeBackground){
    // run twice, once for bg
    // feature support 3d --> no idea how yet
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
  w += params.width_increase; // * params.zoom;
  h = w*params.height_increase; // * params.zoom;
  // h += params.height_increase * params.zoom; // for linear zoom use this
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
  /*
  log spiral in radians using radius=a*exp(k*phi) 
  exp(k*phi), the log, is the ratio of the lengths between two lines that extend out from the origin. 
  */
  w = 1;
  h = 1;
  z = 0;
  if (params.isDrawSpiralCurve){
    beginShape();
  }
    for (let angle = 0;
      angle < params.cycle_degrees ;
      angle += params.increments) 
    {
      if (params.is3D){  
        z += params.z_increment;
      } else {
        z = 0;
      }
      spiral_constant = params.spiral_constant; // * params.zoom; 
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

      r = spiral_constant * exp(polar_slope * phi);

      // log spiral in cartesian form: x=r*cos(phi)=a*e^(k*phi)*cos(phi)
      [x,y] = locationUponLogarithmicSpiral(r, phi, flip=params.isShellDoubleFlip);

      if (params.isDrawSpiralPoints){
        if (params.is3D){   
          push();
          translate(x, y, z);
          sphere(1);
          pop(); 
        } else {
          point(x,y);
        }
      }
      if (params.isDrawSpiralCurve){
        curveVertex(x, y, z);
      }
      if (params.isDrawSpiralShapes){
        // draw ellipses along log spiral curve
        drawEllipseCurve(x, y, w, h, z);
      }
      increaseWH();
    }
    if (params.isDrawSpiralCurve){
      endShape();
    }
}

// dynamically adjust the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawEllipseCurve(x, y, w, h, z=0){
  push();
  translate(x*2, y*2, z*2);
  beginShape();
  for (let t = 0; t <= 360; t+=1){
    coord_x = w * cos(degreesToRadians(t)); 
    coord_y = h * sin(degreesToRadians(t));
    vertex(coord_x, coord_y);
  }
  endShape(CLOSE);
  pop();
}

// feature beautify gui with css
// feature colors of shape
// feature ellipseMode(CORNER)
// feature "ismobile" https://p5js.org/reference/#/p5/deviceMoved
// feature Curvature = cos(alfa)/r
// feature don't orbitzoom on the gui...

