// settings
let CIRCLE_NUMBER = -999;
const CIRCLE_SIZE = 1.5;
const MIN_VELOCITY = -0.75;
const MAX_VELOCITY = 0.75;
const MIN_DIST = 0;
const MAX_DIST = 150;

type Circle = {
  posX: number;
  posY: number;
  velocityX: number;
  velocityY: number;
};

type Edge = {
  opacity: number;
};

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

function updateCircleNumber() {
  CIRCLE_NUMBER = parseInt(String(((canvas.width * canvas.height) / 1e6) * 70));

  CIRCLE_NUMBER = Math.min(CIRCLE_NUMBER, 60);
}

function updateCircle(i: number) {
  let circle = circles[i];

  let opacity = 0;
  for (let j = 0; j < CIRCLE_NUMBER; j++) {
    if (edges[i][j]) opacity += edges[i][j].opacity;
  }

  circle.posX = clamp(circle.posX + circle.velocityX, 0, canvas.width);
  circle.posY = clamp(circle.posY + circle.velocityY, 0, canvas.height);

  context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  context.beginPath();
  context.arc(circle.posX, circle.posY, CIRCLE_SIZE, 0, 2 * Math.PI, false);
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
  circles = new Array(CIRCLE_NUMBER);
  edges = new Array(CIRCLE_NUMBER);
  for (let i = 0; i < CIRCLE_NUMBER; i++) edges[i] = new Array(CIRCLE_NUMBER);

  // fill array value
  for (let i = 0; i < CIRCLE_NUMBER; i++) {
    let circle: Circle = {
      posX: randomRange(0, window.innerWidth),
      posY: randomRange(0, window.innerHeight),
      velocityX: randomRange(MIN_VELOCITY, MAX_VELOCITY),
      velocityY: randomRange(MIN_VELOCITY, MAX_VELOCITY),
    };

    circles[i] = circle;
  }

  for (let i = 0; i < CIRCLE_NUMBER; i++) {
    for (let j = i + 1; j < CIRCLE_NUMBER; j++) {
      edges[i][j] = { opacity: 0 };
    }
  }
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < CIRCLE_NUMBER; i++) {
    for (let j = i + 1; j < CIRCLE_NUMBER; j++) {
      updateEdge(i, j);
    }
  }

  for (let i = 0; i < CIRCLE_NUMBER; i++) {
    updateCircle(i);
  }

  requestAnimationFrame(() => animate()); // run every frame
}

// -------------------------------------------------- //

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

let circles: Circle[];
let edges: Edge[][];

window.onload = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateCircleNumber();
  buildArray();

  animate();
};

window.onresize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  updateCircleNumber();
  console.log(CIRCLE_NUMBER);

  buildArray();
};
