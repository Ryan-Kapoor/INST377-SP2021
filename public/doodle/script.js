document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div") //creating the doodler
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 250
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true

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
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20 
            doodler.style.bottom = doodlerBottomSpace + 'px' //Up by 20 pixels every 30 milliseconds
            if (doodlerBottomSpace > 350) {
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
                    jump()
                }
            })
        },30)
    }

    function GameOver() {
        console.log('game over')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function control(e) {
        if(e.key === "ArrowLeft") { //if the key event = left arrow, 
            //move left
        } else if (e.key === "ArrowRight") {
            //move right
        } else if (e.key === "ArrowUp") {
           //moveStraight
        }
    }

    function start() {
        if (!isGameOver) { //if the game is not over, create the doodler
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30) //platform moves down by 4 pixels every 30 seconds
            jump()
        }
    }
    start()
})