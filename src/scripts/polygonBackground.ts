type Circle = {
  posX: number;
  posY: number;
  velocityX: number;
  velocityY: number;
};

type Edge = {
  opacity: number;
};

// settings
const CIRCLE_SIZE = 1.5;
const MIN_VELOCITY = -0.75;
const MAX_VELOCITY = 0.75;
const MIN_DIST = 0;
const MAX_DIST = 150;
const FRAME_PER_SECOND = 60;
const FRAME_INTERVAL = 1000 / FRAME_PER_SECOND; // in milliseconds

// -------------------------------------------------- //

// utility function
function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function clamp(val: number, min: number, max: number) {
  if (val > max + 100) return min - 100;
  else if (val < min - 100) return max + 100;
  return val;
}

function distance(i: number, j: number) {
  let dx = Math.abs(circles[i].posX - circles[j].posX);
  let dy = Math.abs(circles[i].posY - circles[j].posY);
  return Math.sqrt(dx * dx + dy * dy);
}

// -------------------------------------------------- //

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

let circles: Circle[];
let edges: Edge[][];
let circleNumber: number;
let previousTime = performance.now();

window.onload = () => {
  updateCanvas();
  updateCircleNumber();

  buildArray();

  requestAnimationFrame(animate);
};

window.onresize = () => {
  updateCanvas();
  updateCircleNumber();

  buildArray();
};

// -------------------------------------------------- //

function updateCanvas() {
  const ratio = Math.ceil(window.devicePixelRatio);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
}

function updateCircleNumber() {
  circleNumber = parseInt(String(((canvas.width * canvas.height) / 1e6) * 20));
  circleNumber = Math.min(circleNumber, 60);
}

function updateCircle(i: number, deltaTimeMultiplier: number) {
  let circle = circles[i];

  let opacity = 0;
  for (let j = 0; j < circleNumber; j++) {
    if (edges[i][j]) opacity += edges[i][j].opacity;
  }

  circle.posX += circle.velocityX * deltaTimeMultiplier;
  circle.posY += circle.velocityY * deltaTimeMultiplier;

  circle.posX = clamp(circle.posX, 0, window.innerWidth);
  circle.posY = clamp(circle.posY, 0, window.innerHeight);

  context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  context.beginPath();
  context.arc(circle.posX, circle.posY, CIRCLE_SIZE, 0, 2 * Math.PI, false);
  // context.shadowBlur = 10;
  // context.shadowColor = "white";
  context.closePath();
  context.fill();
}

function updateEdge(i: number, j: number) {
  let dist = distance(i, j);
  let opacity = 0;
  if (MIN_DIST <= dist && dist <= MAX_DIST) {
    opacity = ((dist - MIN_DIST) * 1) / (MAX_DIST - MIN_DIST);
  }
  if (opacity != 0) opacity = 1 - opacity;

  edges[i][j] = { opacity: opacity };
  edges[j][i] = { opacity: opacity };

  context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
  context.beginPath();
  context.moveTo(circles[i].posX, circles[i].posY);
  context.lineTo(circles[j].posX, circles[j].posY);
  context.closePath();
  context.stroke();
}

function buildArray() {
  // define array size
  circles = new Array(circleNumber);
  edges = new Array(circleNumber);
  for (let i = 0; i < circleNumber; i++) edges[i] = new Array(circleNumber);

  // fill array value
  for (let i = 0; i < circleNumber; i++) {
    let circle: Circle = {
      posX: randomRange(0, window.innerWidth),
      posY: randomRange(0, window.innerHeight),
      velocityX: randomRange(MIN_VELOCITY, MAX_VELOCITY),
      velocityY: randomRange(MIN_VELOCITY, MAX_VELOCITY),
    };

    circles[i] = circle;
  }

  for (let i = 0; i < circleNumber; i++) {
    for (let j = i + 1; j < circleNumber; j++) {
      edges[i][j] = { opacity: 0 };
    }
  }
}

function animate(currentTime: number) {
  let deltaTime = currentTime - previousTime;
  let deltaTimeMultiplier = deltaTime / FRAME_INTERVAL;
  previousTime = currentTime;

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circleNumber; i++) {
    for (let j = i + 1; j < circleNumber; j++) {
      updateEdge(i, j);
    }
  }

  for (let i = 0; i < circleNumber; i++) {
    updateCircle(i, deltaTimeMultiplier);
  }

  requestAnimationFrame(animate); // run every frame
}
