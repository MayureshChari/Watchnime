// Define variables
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Define bird and pipe variables
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics variables
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;
let scoreThreshold = 10; // Score threshold to end the game

// Function to initialize the game
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    // Load images
    birdImg = new Image();
    birdImg.src = "../Destination/Images/flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "../Destination/Images/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "../Destination/Images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds
    document.addEventListener("keydown", moveBird);
}

// Function to update the game state
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Bird drawing
    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    // Pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    // Clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //removes first element from the array
    }

    // Score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (score >= scoreThreshold) {
        endGame(); // End the game if score reaches threshold
    }

    if (gameOver) {
        context.fillText("GAME OVER", 5, 100);
    }
}

// Function to place pipes
function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);
}

// Function to move the bird
function moveBird(e) {
    if (e.code == "ArrowUp") {
        velocityY = -6; // Jump

        // Reset game
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

// Function to detect collision between bird and pipes
function detectCollision(a, b) {
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x && //a's top right corner passes b's top left corner
        a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y; //a's bottom left corner passes b's top left corner
}

// Function to end the game
function endGame() {
    gameOver = true;
    // Display popup message congratulating the player
    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = "<p>Congratulations! You've reached the score threshold.</p><button onclick='restartGame()'>Restart Game</button>";
    document.body.appendChild(popup);
}

function restartGame() {
    // Restart the game
    document.querySelector('.popup').remove();
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
}
