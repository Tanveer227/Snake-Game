var snakeBody = [];
var gameBoard;
var gameOver;
var col = 80;
var row = 80;
var blockSize = 9;
var foodX;
var foodY;
var gameOver=false;
var snakeX = blockSize*10;
var snakeY = blockSize*10;
var speedX = 0;
var speedY = 0;
var initialSpeed = 1.5;
var score = 0;
let highScore=JSON.parse(localStorage.getItem('highScoreStore'));
if(!highScore) highScore=0;
function placeFood() {
    foodX=Math.floor(Math.random()*col)*blockSize;
    foodY=Math.floor(Math.random()*row)*blockSize;
}
function changeDirection(e) {
    if(e.code=="ArrowUp" && speedY==0){
        speedX=0;
        speedY=-(initialSpeed+(snakeBody.length-1)*0.1);
    }
    else if(e.code=="ArrowDown" && speedY==0){
        speedX=0;
        speedY=initialSpeed+(snakeBody.length-1)*0.1;
    }
    else if(e.code=="ArrowLeft" && speedX==0){
        speedY=0;
        speedX=-(initialSpeed+(snakeBody.length-1)*0.1);
    }
    else if(e.code=="ArrowRight" && speedX==0){
        speedY=0;
        speedX=initialSpeed+(snakeBody.length-1)*0.1;
    }
}
function update() {
    if(gameOver){
        document.querySelector('.gameBoard')
        .innerHTML=`<div>
                        GAME OVER
                        <button class="gameOver" onclick="window.location.reload()">REPLAY</button>
                    </div>`;
    }

    context.fillStyle = "green";
    context.fillRect(0, 0, blockSize*row, blockSize*col);

    context.fillStyle = "pink";
    context.beginPath();
    context.arc(foodX+(blockSize), foodY+(blockSize), (blockSize), 0, 2*Math.PI);
    context.fill();

    if((snakeX<=foodX+blockSize && snakeX>=foodX-blockSize) && (snakeY<=foodY+blockSize && snakeY >=foodY-blockSize)) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        if(score>highScore) {
            highScore=score;
            let highScoreStore=JSON.stringify(highScore);
            localStorage.setItem('highScoreStore', highScoreStore);
        }
        setScore();
    }
    for(let i = snakeBody.length - 1; i > 0; i--) snakeBody[i] = snakeBody[i - 1];
	if (snakeBody.length) snakeBody[0] = [snakeX, snakeY];

    context.fillStyle = "brown";
    snakeY+=speedY*blockSize;
    snakeX+=speedX*blockSize;
    context.fillRect(snakeX, snakeY, blockSize*2, blockSize*2);
    for(let i=0;i<snakeBody.length;i++) context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize*2, blockSize*2);

    if(snakeX<0 || snakeX> col*blockSize || snakeY<0 || snakeY> row*blockSize) gameOver = true;

    for(let i=0;i<snakeBody.length;i++) {
        if(snakeX==snakeBody[i][0] && snakeY == snakeBody[i][1]) gameOver=true;
    }
}

function start() {
    document.querySelector('.gameBoard')
    .innerHTML=`<canvas id="gameBoard"  width="${col*blockSize}px" height="${row*blockSize}px"></canvas>`;
    gameBoard = document.getElementById('gameBoard');
    gameBoard.width = col*blockSize;
    gameBoard.height = row*blockSize;
    placeFood();
    context=gameBoard.getContext("2d");
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 80);
}
function setScore() {
    document.getElementById('scoreBoard')
    .innerHTML = `<div class="scores">
                    Score: ${score}
                  </div>
                  <div class="scores">
                    HighScore: ${highScore}
                  </div>
    `;
}
window.onload = function () {
    setScore();
}