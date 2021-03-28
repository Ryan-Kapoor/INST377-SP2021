document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird') /* selecting the bird */
    const gameDisplay =  document.querySelector('.game-container') /* selecting the display */
    const ground = document.querySelector('.ground') /* selecting the ground */

    let birdLeft = 220 /* moving the bird to bottom center of skydiv - will do this by adding space between bird's left side and sky's left side */
    let birdBottom= 100
    let gravity = 2.5    
    let isGameOver = false
    let gap = 430

    function startGame() { /* applying the bird's pixel changes to the styling of the bird element */
        birdBottom -= gravity /* we want to minus gravity from birdBottom every time this function is invoked */
        bird.style.bottom = birdBottom + 'px' /*add 100 pixels to the bottom of our bird element, relative to the skydiv it is in */
        bird.style.left = birdLeft + 'px'

    }
    let gameTimerId = setInterval(startGame, 20) /* The startGame function will invoke every 20 milliseconds */

    function control(e) {
        if(e.keyCode === 32) { /* 32 is the keycode for space bar, this function assigns the jump function to the space bar */
            jump()
        }
    }

    function jump() {
        if (birdBottom <500) birdBottom += 50 /* Each time we invoke the jump function, add 50 pixels to what birdBottom is */
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60 //generates random height of obstacle
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div') /* How you create divs in JS */
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle') /* adding an "obstacle" class to this div */
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle) /* This puts our div into the game-container div */
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + "px"
        topObstacle.style.left = obstacleLeft + "px"
        obstacle.style.bottom = obstacleBottom + "px" /* positioning the obstacle */
        topObstacle.style.bottom = obstacleBottom + gap + "px"

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + "px"
            topObstacle.style.left = obstacleLeft + "px"

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000) //If game is not over, generate the obstacles
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
    }
})

