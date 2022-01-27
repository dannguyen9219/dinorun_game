// DOM Variables //

const owenBlue = document.querySelector('.player');
const obstacle = document.querySelector('.obstacle');
const gameWindow = document.querySelector('.game-window');
const scoreCounter = document.querySelector('.scoreCounter');
const enterGameBtn = document.getElementById('enter-game');
const playBtn = document.getElementById('play-game');
const restartBtn = document.getElementById('restart-button');
const exitBtn = document.getElementById('exit-button');
const instructionsModal = document.querySelector(".modal#game-instructions");
const gameoverModal = document.querySelector('.modal#gameover-window');
let counter = 0;

// Event Listeners //

document.addEventListener('keydown', control);

enterGameBtn.addEventListener('click', enterGameBtnClick);

playBtn.addEventListener('click', playBtnClick);

restartBtn.addEventListener('click', playBtnClick);

// Enter Game Function //

function enterGameBtnClick(evt) {
    console.log("Enter button clicked");
    instructionsModal.style.display = 'block';
    enterGameBtn.style.display = 'none';
};

// Start Game Function //

const startGame = () => {
    gameWindow.style.display = 'block';
    scoreCounter.style.display = 'block';
}

// Play Game Button //

function playBtnClick(evt) {
    console.log("Play button clicked");
    instructionsModal.style.display = 'none';
    gameoverModal.style.display = 'none';
    startGame()
};

// Gameover set to false // 

isGameOver = false;

// Space bar function to invoke jump function //

function control (evt) {
    if (evt.keyCode === 32) {
        jump()
    }
};

// Jump Function //

function jump() {
    if (owenBlue.classList != 'animate') {
    owenBlue.classList.add('animate');
    }
    setTimeout(function() { // timer function sets timer to designated time (500ms) to execute function
    owenBlue.classList.remove('animate') // removing the jump animation after designated time
    }, 500) //add time interval to stop adding class every 500ms; this is to jump infinite
}

// Hit obstacle //

const hitTree = setInterval(function() { 
    let owenBlueTop = parseInt(window.getComputedStyle(owenBlue).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if(obstacleLeft < 100 && obstacleLeft > 50 && owenBlueTop >= 240) {
        gameWindow.style.display = "none";
        gameoverModal.style.display = "block";
        //gameOver()
        counter = 0;
        obstacle.style.animation = "obstacle 1.5s infinite linear";
    }   else {
        counter++;
        document.getElementById('scoreSpan').innerHTML = Math.floor(counter) // score
    }
}, 10);

// Game over function //



/* setInterval calls this function every 10ms; this is to check if obstacle is in same position as player every 10ms.
parseInt method converts string to an integer. We are needing the px of player's top position and obstacle's left
position. Window.getComputedStyle is used to return object containing values of their CSS properties of player and 
obstacle. The getPropertyValue identifies the CSS property and returns the value. This is to store their set px from CSS.
If function states if left of obstacle is < 100px and > 50 px and player top is >= 240px, then game over. 
*/

// Generate obstacle function //

// function generateObstacles() {
//     let randomTime = Math.random() + 2
//     if (!isGameOver)obstacle.classList.add(obstacle)
//     gameWindow.appendChild(obstacle)

//     let timerId = setInterval(function() {
//         if (obstaclePosition === 0) {
//             clearInterval(timerId)
//             gameWindow.removeChild(obstacle)
//         }
//         obstaclePosition -= 8
//         obstacle.style.left = obstaclePosition + 'px'
//     }, 20)
//     if (!isGameOver) setTimeout(generateObstacles, randomTime)
// }
// generateObstacles()


// 1/25/2022 2017 Currently working on the game window. Commented out enter-game.css, game-window.css.display, enter game play game start game function