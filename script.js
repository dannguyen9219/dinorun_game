// DOM Variables //

const gameLogo = document.getElementById('game-logo')
const owenBlue = document.querySelector('.player');
const obstacle = document.querySelector('.obstacle');
const gameWindow = document.querySelector('.game-window');
const scoreCounter = document.querySelector('.scoreCounter');
const enterGameBtn = document.getElementById('enter-game');
const playBtn = document.getElementById('play-game');
const restartBtn = document.getElementById('restart-button');
const exitBtn = document.getElementById('exit-button');
const returnTitleBtn = document.getElementById('title-screen-button');
const inputKey = document.getElementById('inputKey');
const submitBtn = document.getElementById('submit-score-button');
const lsOutput = document.getElementById('local-storage-output')
const instructionsModal = document.querySelector(".modal#game-instructions");
const gameoverModal = document.querySelector('.modal#gameover-window');
const exitWindowModal = document.querySelector('.modal#exit-window');
const themeSong = document.getElementById('opening-theme')
const jumpAudio = document.getElementById('jump-sound')
const treeAudio = document.getElementById('tree-sound')

// Event Listeners //

document.addEventListener('keydown', control);

enterGameBtn.addEventListener('click', enterGameBtnClick);

playBtn.addEventListener('click', playBtnClick);

restartBtn.addEventListener('click', restartBtnClick);

exitBtn.addEventListener('click', exitBtnClick);

returnTitleBtn.addEventListener('click', returnTitleBtnClick);

submitBtn.addEventListener('click', submitScoreBtn);

// Enter Game Button Function //

function enterGameBtnClick(evt) {
    console.log("Enter button clicked");
    instructionsModal.style.display = 'block';
    gameLogo.style.display = 'none';
    enterGameBtn.style.display = 'none';
    themeSong.play();
};

// Play Game Button Function //

function playBtnClick(evt) {
    console.log("Play button clicked");
    instructionsModal.style.display = 'none';
    gameoverModal.style.display = 'none';
    startGame()
    themeSong.pause();
};
// Start Game Button Function //

let counter = 0;

const startGame = () => {
    gameWindow.style.display = 'block';
    scoreCounter.style.display = 'block';
    counter = 0;
};

// Exit Game Button Function //

function exitBtnClick(evt) {
    console.log("Exit game button clicked");
    gameoverModal.style.display = "none";
    exitWindowModal.style.display = "block";
};

// Restart Game Button Function //

function restartBtnClick(evt) {
    console.log("Restart game button clicked");
    location.reload();
};

// Return Title Button Function //

function returnTitleBtnClick(evt) {
    counter = 0;
    console.log("Return title button clicked");
    location.reload();
};

// Space bar function to invoke jump function //

function control (evt) {
    if (evt.keyCode === 32) {
        jump();
        jumpAudio.play();
    };
};

// Jump Function //

function jump() {
    if (owenBlue.classList != 'animate') {
    owenBlue.classList.add('animate');
    };
    setTimeout(function() { // timer function sets timer to designated time (500ms) to execute function
    owenBlue.classList.remove('animate') // removing the jump animation after designated time
    }, 500); //add time interval to stop adding class every 500ms; this is to jump multiple times
};

// Hit obstacle //

const hitTree = setInterval(function() { 
    let owenBlueTop = parseInt(window.getComputedStyle(owenBlue).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if(obstacleLeft < 100 && obstacleLeft > 50 && owenBlueTop >= 240) {
        treeAudio.play();
        gameOver()
        document.getElementById('scoreTextSpan').innerHTML = Math.floor(counter);
        obstacle.style.animation = "obstacle 1.5s infinite linear";
    }   else {
        counter++;
        document.getElementById('scoreSpan').innerHTML = Math.floor(counter);
    }
}, 10);

// Submitting your Score Function //

function submitScoreBtn(evt) {
    console.log("Submit score button clicked")
    const key = inputKey.value;
    if (key) {
        localStorage.setItem(key, Math.floor(counter));
        counter = 0;
    };

    gameoverModal.style.display = 'none';
    exitWindowModal.style.display = 'block';

    console.log("Before: ", localStorage);
    lsOutput.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(i)
            const value = localStorage.getItem(key);
            const scoreDiv = document.createElement("div");
            scoreDiv.innerHTML = `${key}: ${value}`;
            lsOutput.appendChild(scoreDiv);
    };
    console.log("After: ", localStorage);
    inputKey.value = "";
};

// Game Over Function //

const gameOver = () => {
    gameWindow.style.display = 'none';
    gameoverModal.style.display = 'block';
    clearInterval(hitTree)
};