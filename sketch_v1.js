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
  noLoop();

  // settings for ellipses
  let w = 1;
  let h = 1; 
  // ellipseMode(CORNER);
  noFill();
  stroke(3);



  // vars of ellipses
  let spiralLoopNumber = 300*PI;
  let spiralDensity = 1.9*PI; // the higher the more dense
  let spiralRadiusDelta = 1.025*PI; //1.025;
  let startingAngle = 50;
  // degree to polar: 50/360 * 2*PI ??
  line(0,0,30/360 * 2*PI*10,30/360 * 2*PI*10);
  let counter = 0;
  //draw ellipses along Fibonacci curve
  beginShape();
  for (let radius = 10; radius < 100; radius +=10)
  {
    // let radius = 1;
    for (let angle = startingAngle ; 
        angle < (spiralLoopNumber-startingAngle); 
        // angle < 250; 
        angle += spiralDensity) 
    {
      print("counter " + counter);
      counter++;
      [x,y] = logarithmicSpiral(radius,(angle*PI/100));
      // curveVertex(x, y);
      point(x,y);
      // ellipse(x, y, w, h);
      w+=2;
      h+=2; 
      radius+=spiralRadiusDelta; // * or +
      // stroke(counter);
      // break;

      // Sequence(
        // Ellipse(
        //   (0.1 t π / 100; t π / 100), 
        //   (1.9 t π / 100; t π / 100), 
        //   t π / 100), 
        //   t, 
        //   0, 
        //   250)


    }
  // break;
  }
  endShape();

}


function logarithmicSpiral(radius,angle){
 // https://mathworld.wolfram.com/LogarithmicSpiral.html
 // flip sin and cos for a flipped spiral
  x = radius * sin(angle);
  y = radius * cos(angle);
  return [x,y];
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


// saved bugs:
// // vars of ellipses
// let spiralLoopNumber = 3*PI;
// let spiralDensity = 0.09*PI; // the higher the more dense
// let spiralRadiusDelta = 0.1; //1.025;
// let startingAngle = 0;

// //draw ellipses along Fibonacci curve
// beginShape();
// for (let radius = 0.1; radius < 1.9; radius +=0.1)
// {
//   for (let angle = startingAngle ; 
//       // angle < (spiralLoopNumber-startingAngle); 
//       angle < 250; 
//       angle += spiralDensity) 
//   {
//     [x,y] = logarithmicSpiral(radius,(angle*PI/100));
//     // curveVertex(x, y);
//     ellipse(x, y, w, h);
//     w+=2;
//     h+=2; 
//     radius+=spiralRadiusDelta; // * or +
//     // break;
//   }
// }


//
// // vars of ellipses
// let spiralLoopNumber = 3*PI;
// let spiralDensity = 1;//*PI; // the higher the more dense
// let spiralRadiusDelta = 0.1; //1.025;
// let startingAngle = 0;

// //draw ellipses along Fibonacci curve
// beginShape();
// for (let radius = 0.1; radius < 1.9; radius +=0.1)
// {
//   for (let angle = startingAngle ; 
//       // angle < (spiralLoopNumber-startingAngle); 
//       angle < 250; 
//       angle += spiralDensity) 
//   {
//     [x,y] = logarithmicSpiral(radius,(angle*PI/100));
//     // curveVertex(x, y);
//     ellipse(x, y, w, h);
//     w+=2;
//     h+=2; 
//     radius+=spiralRadiusDelta; // * or +
//     // break;

//     // Sequence(
//       // Ellipse(
//       //   (0.1 t π / 100; t π / 100), 
//       //   (1.9 t π / 100; t π / 100), 
//       //   t π / 100), 
//       //   t, 
//       //   0, 
//       //   250)


//   }
// // break;
// }
// endShape();

// }
