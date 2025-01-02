const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size for mobile devices
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
const playerSpeed = 5;
const playerSize = 50;
let gameState = "intro";
const storyTextElement = document.getElementById("storyText");

const introText = [
    "You find yourself standing in front of an old house.",
    "You step inside, unsure of what awaits.",
    "A cold chill runs down your spine as you hear whispers.",
    "As you move deeper into the house, the atmosphere grows darker."
];

const endingText = [
    "You discover the tragic truth of Elisabeth's past.",
    "Your heart aches as you realize the horrors she faced.",
    "You wake up, crying, knowing the truth."
];

let currentText = introText;

function updateText() {
    storyTextElement.innerHTML = currentText.join("<br>");
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = "white";
    ctx.fillRect(playerX, playerY, playerSize, playerSize);

    // Story Progression
    if (gameState === "intro" && playerX > canvas.width / 2 + 100) {
        gameState = "middle";
        currentText = ["You find clues that lead to the tragic truth..."];
        updateText();
    } else if (gameState === "middle" && playerX > canvas.width / 2 + 200) {
        gameState = "ending";
        currentText = endingText;
        updateText();
    }

    // Loop the game
    requestAnimationFrame(gameLoop);
}

// Analog-style touch controls
let touchStartX, touchStartY, touchMoveX, touchMoveY;

window.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
    touchMoveX = e.touches[0].clientX;
    touchMoveY = e.touches[0].clientY;

    // Calculate movement based on the difference from the start point
    const deltaX = touchMoveX - touchStartX;
    const deltaY = touchMoveY - touchStartY;

    // Use the delta to move the player
    playerX += deltaX * 0.05;  // Adjust the multiplier for sensitivity
    playerY += deltaY * 0.05;  // Adjust the multiplier for sensitivity

    // Prevent the player from moving outside the canvas
    playerX = Math.max(0, Math.min(playerX, canvas.width - playerSize));
    playerY = Math.max(0, Math.min(playerY, canvas.height - playerSize));

    // Update the starting point for the next move
    touchStartX = touchMoveX;
    touchStartY = touchMoveY;
});

// Resize canvas when window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    playerX = canvas.width / 2;
    playerY = canvas.height / 2;
    updateText();
});

updateText();
gameLoop();
