let centerX,centerY = 0; // center position canvas
let saveGif = false;
var gui; // double click to disappear gui
var gui_3d; // double click to disappear gui
let S_KEY = '83';
let firstLoad = true;

// todo  - can params change within the shell?
// todo make 3d more dense
// todo make more shapes?
// todo double/ multi shells

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
  spiral_constantMax : 150,
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

  z_increment:3,
  z_incrementMin:0.1,
  z_incrementMax:10,
  z_incrementStep:0.1,

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(10);
  pixelDensity(4.0);

  gui = createGui("Digital Shells");//.setPosition(windowWidth*0.85,10);
  gui.addObject(params);
}

function preload() {
  font = loadFont('resources/OpenSans-Light.ttf');
}

function draw() {
  background(255,255,255,0); 
  orbitControl();
  // debugMode();

  if (params.fillShapeBackground){
    // run twice, once for bg
    // feature support 3d --> no idea how yet
    fill(255);
    noStroke();
    drawSpiralFullEquation();
  }

  // settings for ellipses
  noFill();
  stroke('black');
  strokeWeight(params.line_stroke);

  // calculate spiral and draw shapes using the full spiral equation
  drawSpiralFullEquation();

  if (firstLoad){
    push();
    let aString = 'zoom out to fit shell to screen,';
    let bString = "then press 's' to save image";
    // let text_Width = textWidth(aString);
    let text_Width = 700;
    let text_size = 36;
    rectMode(CENTER);
    noStroke();
    translate(0,0,100);
    fill(10);
    rect(0, 10, text_Width, 100);
    fill('cyan');
    textSize(text_size);
    textFont(font);
    text(aString, -text_Width/2+20, 0)
    text(bString, -text_Width/2+20, text_size+4);
    pop();
  }

  // noLoop(); // --> kills orbitControl
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
  for (let angle = 0; angle < params.cycle_degrees ; angle += params.increments) 
  {
    if (params.is3D){  
      z += params.z_increment;
      // normalMaterial();
      // z = angle/(2 * PI);
      // -25* t/ (2 * PI)
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
        translate(x, z, y); // in 3d y and z are flipped
        sphere(1);
        pop(); 
      } else {
        point(x,y);
      }
    }
    if (params.isDrawSpiralCurve){
      // TODO fix
      if (params.is3D){
        curveVertex(x, z, y);
      }
      else{
        curveVertex(x, y);
      }
    }
    if (params.isDrawSpiralShapes){
      // draw ellipses along log spiral curve
      // feature not only ellipse
      if (params.is3D){
        // feature switch axis for tube?
        // drawEllipseCurve(x, y, w, h, z);
        drawEllipseCurve(x, z, w, h, y);
      } else {
        drawEllipseCurve(x, y, w, h);
      }
    }
    increaseWH();
  }
  if (params.isDrawSpiralCurve){
    endShape();
  }
}

function drawEllipseCurve(x, y, w, h, z=0){
  // https://undergroundmathematics.org/glossary/ellipse#:~:text=The%20Cartesian%20equation%20of%20an,t)%3Dbsint.
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

// dynamically adjust the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if (keyCode == S_KEY ) // s key
  {
    savePngSerial();
  }
}

function savePngSerial()
{
  // libraries
  // https://github.com/tapioca24/p5.capture
  // https://www.npmjs.com/package/p5snap
  // https://editor.p5js.org/golan/sketches/qKJcoNHXX
  // https://github.com/drskullster/p5.js-export 
  // https://kentskyo.com/high-resolution-sketches-with-p5js/

  // manual :
  serial = extractSerial();
  save(serial + ".png");
}

function extractSerial(){
  let serial_array = [];
  // create serial number 
  for (let k in params) {
    if (k.includes("Max") || k.includes("Min") || k.includes("Step") ){
      // pass sliders definitions
    } else if (k.includes("bgColor")) {
      // pass color
    } else if (params[k] == true){
      // console.log(k + ' is ' + 1);
      serial_array.push("1");
    } else if (params[k] == false){
      // console.log(k + ' is ' + 0);
      serial_array.push("0");
    } else {
      // console.log(k + ' is ' + params[k]);
      serial_array.push(str((params[k])));
      }
    }
  console.log(serial_array);
  return str(serial_array);
}

function mouseClicked(){
  firstLoad = false;
}

function drawPerlinRing(){
  // https://forum.processing.org/two/discussion/24646/how-to-save-a-sketch-as-a-high-res-image.html
  // if (s < 2000) {
  //   // Create a series of perlin rings from big to small
  //   for (int nTimes = 0; nTimes < 250; nTimes++) {

  //     // Less points for smaller rings
  //     int nPoints = int(4 * PI * s);
  //     nPoints = min(nPoints, 500);
  //     //println(nPoints);

  //     // Create ring
  //     for (int i = 0; i < nPoints; i++) {
  //       float a = (float)i / nPoints * TAU;
  //       float n = noise(xOffset + cos(a) * inc, yOffset + sin(a) * inc) * s;
  //       float a1 = (float)(i + 1) / nPoints * TAU;
  //       float n1 = noise(xOffset + cos(a1) * inc, yOffset + sin(a1) * inc) * s;
  //       line(n * cos(a), n * sin(a), n1 * cos(a1), n1 * sin(a1));
  //     }

  //     // Increment perlin offset for next ring
  //     xOffset += offsetInc;
  //     yOffset += offsetInc;

  //     // Update size
  //     s *= m;
  //   }
}



// feature beautify gui with css --> or https://openprocessing.org/sketch/872912
// feature colors of shape
// feature ellipseMode(CORNER)
// feature "ismobile" https://p5js.org/reference/#/p5/deviceMoved
// feature Curvature = cos(alfa)/r
// feature don't orbitzoom on the gui...
// feature:: use this gui https://kentskyo.com/high-resolution-sketches-with-p5js/

