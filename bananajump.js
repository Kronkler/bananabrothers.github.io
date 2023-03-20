const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const bananabrother = new Image();
bananabrother.src = 'bananabrother.gif';
const bananaWidth = 50;
const bananaHeight = 50;
const gravity = 1;
const velocity = -15;
let score = 0;
let gameSpeed = 3;

let banana = {
    x: 150,
    y: 200,
    dy: 0
};

let obstacles = [];

// Functions
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw banana
    ctx.drawImage(bananabrother, banana.x, banana.y, bananaWidth, bananaHeight);

    // Update banana
    banana.dy += gravity;
    banana.y += banana.dy;

    // Check for ground collision
    if (banana.y + bananaHeight >= canvas.height) {
        banana.y = canvas.height - bananaHeight;
        banana.dy = 0;
    }

    // Generate obstacles
    if (Math.random() < 0.01) {
        obstacles.push(new Obstacle());
    }

    // Update and draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        obstacles[i].draw();

        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            i--;
            score++;
        }
    }

    // Draw score
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    requestAnimationFrame(animate);
}

// Obstacle class
class Obstacle {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width;
        this.y = canvas.height - this.height;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= gameSpeed;
    }
}

// Event listeners
canvas.addEventListener('click', () => {
    if (banana.y === canvas.height - bananaHeight) {
        banana.dy = velocity;
    }
});

// Start game
animate();
