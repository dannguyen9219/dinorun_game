document.addEventListener('DOMContentLoaded', () => {

const owenBlue = document.querySelector('.owen-blue')
const gameWindow = document.querySelector('.game-container')
const alert = document.getElementById('alert')
const body = document.querySelector('body')
const gameOverImage = document.createElement('div')
gameOverImage.classList.add('ian-malcolm')

let isJumping = false // variable used to eliminate double jumping
let gravity = 0.9
let isGameOver = false

// creating function event when space bar is pressed, then invoke jump function
function control(evt) {
    if (evt.keyCode === 32) {
        if (!isJumping) {
            isJumping = true
            jump()
        }
    }
}
document.addEventListener('keydown', control) // adding event listener for keydown 

// position of player at start game
let position = 0 

// jump function of player
function jump() {
    let count = 0
    // moving player by 10 px every 15ms until player hits 150px, so create id to set the interval function
    let timerId = setInterval(function() {
        // moving player down    
        if (count === 15) { // after 15ms, player starts falling towards ground
            clearInterval(timerId) // clearing time event interval should stop player from jumping up
            // method to not allow double jumping
            let downTimerId = setInterval(function () {
                if (count === 0) {
                    clearInterval(downTimerId)
                    isJumping = false
                }
                position -= 5
                count -- // minus 1 each time 
                position = position * gravity
                owenBlue.style.bottom = position + 'px'
            }, 20) // invoking every 20ms for the function
        }
        // moving player up from ground
        position += 30 // incrementing player up by 30 px during interval
        count ++
        position = position * gravity // multiplying position and gravity 
        owenBlue.style.bottom = position + 'px' // assigning player to the position of the browser
    }, 20) // invoking every 20ms
}

function generateObstacles() {
    let randomTime = Math.random() * 3500 // random number multiplied by 3.5s to generate obstacles
    let obstaclePosition = 1000 // starting 1000px from where player is positioned
    const obstacle = document.createElement('div') // creating new obstacle element on dom
    if (!isGameOver)obstacle.classList.add('obstacle') // if still playing game, then add class obstacle
    gameWindow.appendChild(obstacle) // appending the obstacle as a child to game window
    obstacle.style.left = obstaclePosition + 'px' // adding 1000px to left side of obstacle

    let timerId = setInterval(function() {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) { // 60 is based on set px on CSS
            clearInterval(timerId)
            gameOver()
            alert.innerHTML = "You Lose"
            isGameOver = true
            // removing all child divs when game is over
            body.removeChild(body.firstChild)
            while (gameWindow.firstChild) {
                gameWindow.removeChild(gameWindow.lastChild)
            }
        }
        obstaclePosition -= 10 // every 20ms obstacle shrinks left spacing by 10px
        obstacle.style.left = obstaclePosition + 'px'
    }, 20) // invoking every 20ms
    if (!isGameOver) setTimeout(generateObstacles, randomTime)
}
generateObstacles()

function gameOver() {
    //clearInterval(timerId)
    console.log("game over")
    isGameOver = true // letting variable know that game over is true
    document.removeEventListener('keydown', control) // removing event listener when game over
    body.appendChild(gameWindow(gameOverImage)) // bug: need to add image when lose
}


}) //Last line of code

// Need to add score keeper
// Health bar instead of instant game over?
// Dan