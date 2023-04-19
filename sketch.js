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
  let h = 10; 
  ellipseMode(CORNER);
  noFill();
  stroke(1);

  // vars of ellipses
  let spiralLoopNumber = 3*PI;
  let spiralDensity = 0.5*PI; // the higher the more dense
  let spiralRadiusDelta = 0.25*PI; //1.025;
  let startingAngle = 0;

  //draw ellipses along Fibonacci curve
  beginShape();
  for (let radius = 0; radius < 10; radius +=1)
  {
    for (let angle = startingAngle ; 
        // angle < (spiralLoopNumber-startingAngle); 
        angle < 250; 
        angle += spiralDensity) 
    {
      [x,y] = logarithmicSpiral(radius,(angle*PI/100));
      curveVertex(x, y);
      ellipse(x, y, w, h);
      w+=2;
      h+=2; 
      radius+=spiralRadiusDelta; // * or +
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
  x = radius * cos(angle);
  y = radius * sin(angle);
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
