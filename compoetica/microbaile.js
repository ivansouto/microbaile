let spriteSheet;
let frame = 0;
let totalFrames = 14; 
let cols = 4;        
let rows = 2;         
let canvasWidth = 640;
let canvasHeight = 320;
let frameWidth = 32;
let frameHeight = 32;
let frameRateGeral = 30;
let frameRateAnim = 6; 
let qtt = 0;
let randomColor = [];
let pos = [[],[]];
let colors = [[169, 191, 4],[253, 171, 27],[245, 55, 80],[58, 177, 137],[3, 101, 140]]
//let colors = [[245, 102, 120],[242, 162, 206],[20, 38, 140],[59, 246, 105],[239, 232, 49],[175, 175, 165],[239, 243, 242],[25, 31, 43]]
let anims = [];
let backgroundColor = colors[1];
let osc, env;

function preload() {
  spriteSheets = [loadImage("spritesheet1.png"),  loadImage("spritesheet2.png"),loadImage("spritesheet3.png"),loadImage("spritesheet4.png")];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(frameRateGeral);
  noSmooth();      
  pixelDensity(1);
  
  for (i=0; i < qtt; i++) {
    pos[0].push(Math.random()*canvasWidth);
    pos[1].push(Math.random()*canvasHeight);
  }
  
  for (i=0; i < windowWidth/frameWidth; i++) {
    randomColor.push([])
    anims.push([])
    for (j=0; j < windowHeight/frameHeight; j++) {
      randomColor[i].push(random(colors));
      anims[i].push(random(spriteSheets));
    }
  }

  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0, 0); 

  env = new p5.Envelope(0.01, 0.3, 0.1, 0.0, 0.1, 0);
  env.setRange(0.2, 0); 

  slider = createSlider(7, 20, 12, 1);
  slider.position(width - 180, 30); 
  slider.style('appearance', 'none');
  slider.style('background', '#fff');
  slider.style('width', '150px');
  slider.style('height', '3px');
  slider.style('accent-color', '#000');

  label = createP('frameRate');
  label.position(width - 110, 5);
  label.style('color', '#000');
  label.style('margin', '0');
  label.style('padding', '0');

}

function draw() {

  frameRateAnim = slider.value();
  background(backgroundColor);

  let index = floor(frameCount / (frameRateGeral / frameRateAnim)) % totalFrames;

  //efeitos sonoros
 
  if (floor(frameCount / (frameRateGeral / frameRateAnim))%14 == 0){
    tocarSom();
  }

   if (floor(frameCount / (frameRateGeral / frameRateAnim))%28 == 7){
    tocarSom(160);
  }

  if (floor(frameCount / (frameRateGeral / frameRateAnim))%28 == 19){
    tocarSom(190);
  }

  if (floor(frameCount / (frameRateGeral / frameRateAnim))%28 == 24){
    tocarSom(190);
  }

  let sx = (index % cols) * frameWidth;
  let sy = floor(index / cols) * frameHeight;
  
  /*
    for (i=0; i < windowWidth/frameWidth; i++) {
      for (j=0; j < windowHeight/frameHeight; j++) {
        noStroke();
        fill(randomColor[i][j]);
        rect(i*frameWidth,j*frameHeight,frameWidth,frameHeight);
        image(anims[i][j], i*frameWidth, j*frameHeight, frameWidth*1, frameHeight*1, sx, sy, frameWidth, frameHeight);    
      }
  }
*/

  for (i=0; i < qtt; i++) {
    image(spriteSheets[i%spriteSheets.length], pos[0][i], pos[1][i], frameWidth*1, frameHeight*1, sx, sy, frameWidth, frameHeight);
   
 } 
  
  if(mouseIsPressed && frameCount % 4 === 0) {
    getAudioContext().resume();
     if (mouseX < width - 210 || mouseY > 65) {
        pos[0].push(mouseX-frameWidth/2);
        pos[1].push(mouseY-frameHeight/2);
        qtt = qtt +1;
     }
  }
  
 if (floor(frameCount / (frameRateGeral / frameRateAnim))%56 == 0) {
   backgroundColor = random(colors);
   // backgroundColor = colors[2];
 }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function tocarSom(freq = 115) {
  osc.freq(freq);
  env.play(osc);
}
