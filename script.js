// Set up the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the game variables
let snake = [{ x: 200, y: 200 }];
let food = {};
let direction = "right";
let score = 0;

// Set up the game loop
function gameLoop() {
  // Move the snake
  const head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y -= 10;
      break;
    case "down":
      head.y += 10;
      break;
    case "left":
      head.x -= 10;
      break;
    case "right":
      head.x += 10;
      break;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    // If the snake eats the food, add a new segment and create a new food
    score++;
    generateFood();
  } else {
    // Otherwise, remove the last segment of the snake
    snake.pop();
  }

  // Draw the game
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "Darkgray";
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.fillStyle = "crimson";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  // Check for game over
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    clearInterval(intervalId);
    alert(`Game over! Score: ${score}`);
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(intervalId);
      alert(`Game over! Score: ${score}`);
    }
  }
}

// Set up the keyboard controls
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

// Set up the initial game state
generateFood();
let intervalId = setInterval(gameLoop, 100);

// Helper functions
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10
  };
}
