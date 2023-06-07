let centerX,centerY = 0; // center position canvas
let saveGif = false;
var gui; // double click to disappear gui
var gui_3d; // double click to disappear gui
// let serial_array = [];
let S_KEY = '83';
let outputScale = 15/2;
let currentScale;
let scaledCanvas;
let canvas;
// let WINDOWHEIGHT 
// let WINDOWWIDTH

// todo export pngs
// todo  - can params change within the shell?
// todo make 3d more dense
// todo make more shapes?
// todo double/ multi shells
// popupwindow - zoom out, s to save

let params = {
  // https://github.com/bitcraftlab/p5.gui/tree/master
  
  // bgColor: '#d8ecf8', 
  // transparentBackground: true,
 
  line_stroke: 1,
  line_strokeMin: 0.01,
  line_strokeMax: 3,
  line_strokeStep: 0.01,

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

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  scaledCanvas = createGraphics(windowWidth, windowHeight);
  // canvas = createCanvas(800, 800, WEBGL);
  // scaledCanvas = createGraphics(800, 800, WEBGL);
  currentScale = 1; // initialize to 1; don't touch
  frameRate(10);

  // createCanvas(windowWidth, windowHeight, WEBGL);

  gui = createGui("Digital Shells").setPosition(windowWidth*0.85,10);
  gui.addObject(params);
}


function exportHighResolution() {
  // Scale up graphics before exporting
  // https://editor.p5js.org/golan/sketches/qKJcoNHXX
  currentScale = outputScale; // High-Res Export
  let temp_width = 800;
  let temp_height = 800;
  scaledCanvas = createGraphics(currentScale * temp_width, currentScale * temp_height, WEBGL);
  draw();
  // save(myScaledCanvas, 'hi' , 'png');
  // savePngSerial(scaledCanvas);
  serial = extractSerial();
  save(scaledCanvas, serial+'.png');
  // save(myScaledCanvas, "highResImage", 'png');
  currentScale = 1; // Reset to default scale 1:1
  scaledCanvas = createGraphics(temp_width, temp_height, WEBGL);
  draw();
}


function savePngSerial(canv)
{
  // libraries
  // https://github.com/tapioca24/p5.capture
  // https://www.npmjs.com/package/p5snap
  // https://editor.p5js.org/golan/sketches/qKJcoNHXX
  // https://github.com/drskullster/p5.js-export 
 
  // manual :
  // serial = extractSerial();
  // save(canv, serial + ".png");
}

function extractSerial(){
  let serial_array = [];
  // create serial number 
  for (let k in params) {
    if (k.includes("Max") || k.includes("Min") || k.includes("Step") ){
      // pass sliders
    } else if (k.includes("bgColor")) {
      // pass color
    } else if (params[k] == true){
      console.log(k + ' is ' + 1);
      serial_array.push("1");
    } else if (params[k] == false){
      console.log(k + ' is ' + 0);
      serial_array.push("0");
    } else {
      console.log(k + ' is ' + params[k]);
      serial_array.push(str((params[k])));
      }
    }
  // console.log(serial_array);
  return str(serial_array);
}

function keyPressed(){
  if (keyCode == S_KEY ) // s key
  {
    // savePngSerial(scaledCanvas);
    exportHighResolution();
  }
}

function draw() {
  // Don't touch the contents of the draw loop!
  // Instead, modify the guts of the drawCanvas() function.
  let temp_width = windowWidth;
  let temp_height = windowHeight;
  scaledCanvas.clear();
  scaledCanvas.push();
  scaledCanvas.scale(currentScale);
  drawCanvas();
  scaledCanvas.pop();
  // image(scaledCanvas, -temp_width*0.5, -temp_height*0.5, 0); // Show on the main canvas
  image(scaledCanvas, 0, 0); // Show on the main canvas
  // noLoop();

  // TEST
  // // noLoop(); // --> kills orbitControl
  // // if(params.transparentBackground){
  // background(255,255,255,0); 
  // // } else {
  // //   background(params.bgColor);
  // // }
  // orbitControl();

  // if (params.fillShapeBackground){
  //   // run twice, once for bg
  //   // feature support 3d --> no idea how yet
  //   fill(255);
  //   noStroke();
  //   drawSpiralFullEquation();
  // }

  // // settings for ellipses
  // noFill();
  // stroke('black');
  // strokeWeight(params.line_stroke);

  // // calculate spiral and draw shapes using the full spiral equation
  // drawSpiralFullEquation();

  // // calculate spiral and draw shapes using the simplified spiral equation
  // // drawSpiralRadiusAngle();
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
  h  = w*params.height_increase; // * params.zoom;
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
    scaledCanvas.beginShape();
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
          scaledCanvas.push();
          scaledCanvas.translate(x, y, z);
          scaledCanvas.sphere(1);
          scaledCanvas.pop(); 
        } else {
          scaledCanvas.point(x,y);
        }
      }
      if (params.isDrawSpiralCurve){
        scaledCanvas.curveVertex(x, y, z);
      }
      if (params.isDrawSpiralShapes){
        // draw ellipses along log spiral curve
        drawEllipseCurve(x, y, w, h, z);
      }
      increaseWH();
    }
    if (params.isDrawSpiralCurve){
      scaledCanvas.endShape();
    }
}

// // dynamically adjust the canvas to the window
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function drawEllipseCurve(x, y, w, h, z=0){
  scaledCanvas.push();
  scaledCanvas.translate(x*2, y*2, z*2);
  scaledCanvas.beginShape();
  for (let t = 0; t <= 360; t+=1){
    coord_x = w * cos(degreesToRadians(t)); 
    coord_y = h * sin(degreesToRadians(t));
    scaledCanvas.vertex(coord_x, coord_y);
  }
  scaledCanvas.endShape(CLOSE);
  scaledCanvas.pop();
}


function drawCanvas(){
  // noLoop(); // --> kills orbitControl
  // if(params.transparentBackground){
  background(255,255,255,0); 
  scaledCanvas.pixelDensity(4.0);
  // } else {
  //   background(params.bgColor);
  // }
  orbitControl();

  if (params.fillShapeBackground){
    // run twice, once for bg
    // feature support 3d --> no idea how yet
    scaledCanvas.fill(255);
    scaledCanvas.noStroke();
    drawSpiralFullEquation();
  }

  // settings for ellipses
  scaledCanvas.noFill();
  scaledCanvas.stroke('black');
  scaledCanvas.strokeWeight(params.line_stroke);

  // calculate spiral and draw shapes using the full spiral equation
  drawSpiralFullEquation();

  // calculate spiral and draw shapes using the simplified spiral equation
  // drawSpiralRadiusAngle();
}



// feature beautify gui with css --> or https://openprocessing.org/sketch/872912
// feature colors of shape
// feature ellipseMode(CORNER)
// feature "ismobile" https://p5js.org/reference/#/p5/deviceMoved
// feature Curvature = cos(alfa)/r
// feature don't orbitzoom on the gui...

