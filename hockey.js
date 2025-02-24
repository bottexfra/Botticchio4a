const canvas = document.getElementById("hockeyCanvas");
const ctx = canvas.getContext("2d");

// Impostazioni iniziali
const PADDLE_WIDTH = 10, PADDLE_HEIGHT = 100, BALL_RADIUS = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;
let paddle1Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
let paddle2Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
let paddle1Speed = 0, paddle2Speed = 0;

const PADDLE_SPEED = 6;

// Disegna la pallina
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6347";
    ctx.fill();
    ctx.closePath();
}

// Disegna le mazzette
function drawPaddles() {
    ctx.fillStyle = "#ff6347";
    ctx.fillRect(20, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT); // Giocatore 1
    ctx.fillRect(canvas.width - 30, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT); // Giocatore 2
}

// Disegna la linea centrale
function drawCenterLine() {
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.closePath();
}

// Movimento della pallina
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + BALL_RADIUS > canvas.height || ballY - BALL_RADIUS < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + BALL_RADIUS > canvas.width || ballX - BALL_RADIUS < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // Collisione con le mazzette
    if (ballX - BALL_RADIUS < 30 && ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + BALL_RADIUS > canvas.width - 30 && ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
    }
}

// Movimento delle mazzette
function movePaddles() {
    paddle1Y += paddle1Speed;
    paddle2Y += paddle2Speed;

    // Limitare il movimento delle mazzette
    paddle1Y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, paddle1Y));
    paddle2Y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, paddle2Y));
}

// Controlli da tastiera
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        paddle2Speed = -PADDLE_SPEED;
    } else if (e.key === "ArrowDown") {
        paddle2Speed = PADDLE_SPEED;
    }
    if (e.key === "w") {
        paddle1Speed = -PADDLE_SPEED;
    } else if (e.key === "s") {
        paddle1Speed = PADDLE_SPEED;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        paddle2Speed = 0;
    }
    if (e.key === "w" || e.key === "s") {
        paddle1Speed = 0;
    }
});

// Funzione di disegno
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    drawCenterLine();
    moveBall();
    movePaddles();
    requestAnimationFrame(draw);
}

// Avvia il gioco
draw();
