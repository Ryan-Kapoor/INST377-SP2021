document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div") //creating the doodler
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0



    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add("doodler") //adding the doodler
        doodlerLeftSpace = platforms[0].left //starts the doodler over the position of the first platform
        doodler.style.left  = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace +"px"
    }

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom
            this.left = Math.random() * 315 //400 - 85 = 315, this returns any number from 0 to 315
            this.visual = document.createElement('div')
            
            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
        for (let i=0; i < platformCount; i++) { //creating the for loop
            let platformGap = 600 / platformCount
            let newPlatformBottom = 100 + i * platformGap //using the for loop to increment the gap space
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform) //pushing the platforms into the array
            console.log(platforms)
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) { //platforms move if doodlerBottomSpace is above 200
            platforms.forEach(platform => {
                platform.bottom -= 4 //platform.bottom minus 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px' //move platforms down by 4 pixels each time

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual 
                    firstPlatform.classList.remove('platform') //removing the class of platform from the first item so we don't see it anymore
                    platforms.shift() //removing the first item in the array
                    score ++ //incrememting the score when a platform disappears off the bottom of the screen
                    console.log(platforms)
                    let newPlatform = new Platform(600) //new platform will appear at the top of the grid
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20 
            doodler.style.bottom = doodlerBottomSpace + 'px' //Up by 20 pixels every 30 milliseconds
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        },30)
    }

    function fall() {
        clearInterval(upTimerId) //clear the upTimerId interval because we want the doodler to stop jumping
        isJumping = false
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + "px" //Down by 5 pixels every 30 milliseconds
            if (doodlerBottomSpace <= 0) {
                GameOver()
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= platform.left) && //adding width of doodler to the left space, if that number is smaller than platform.left he is not on the platform
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log('landed')
                    startPoint = doodlerBottomSpace //Overriding 150, if we are on platform, then we can override the start point
                    jump()
                }
            })
        },20)
    }

    function GameOver() {
        console.log('game over')
        isGameOver = true
        while (grid.firstElementChild) { //if the first child of the grid exsists, we continue to remove the first child
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function control(e) {
        if(e.key === "ArrowLeft") { //if the key event = left arrow, start the moveLeft function
            moveLeft()
        } else if (e.key === "ArrowRight") {
            moveRight()
        } else if (e.key === "ArrowUp") {
           moveStraight()
        }
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId - setInterval(function (){
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveRight()

        },20)
    }

    function moveRight() {
        if(isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function () {
            if(doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveLeft()
        }, 30)
    }

    function moveStraight() {
        isGoingRight = false
        isGoingLeft = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
    }

    function start() {
        if (!isGameOver) { //if the game is not over, create the doodler
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30) //platform moves down by 4 pixels every 30 seconds
            jump()
            document.addEventListener('keyup', control)
        }
    }
    start()
})