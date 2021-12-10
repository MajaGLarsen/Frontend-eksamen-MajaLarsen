/*--------------------------------
            Variables
------------------------------- */
let playerImgI = new Image()
playerImgI.src = "FarmingGame/images/girlInside.png"

let floorImgI = new Image()
floorImgI.src = "FarmingGame/images/floor.png"

let bedImgI = new Image()
bedImgI.src = "FarmingGame/images/bed.png"

let plantImgI = new Image()
plantImgI.src = "FarmingGame/images/plant.png"

let kitchenHorImg = new Image()
kitchenHorImg.src = "FarmingGame/images/kitchenHor.png"

let kitchenVerImg = new Image()
kitchenVerImg.src = "FarmingGame/images/kitchenVer.png"

let fireplaceImg = new Image()
fireplaceImg.src = "FarmingGame/images/fireplace.png"


/*--------------------------------
        Canvas - game
------------------------------- */
let canvasI = document.getElementById("canvas2")
let ctxI = canvasI.getContext("2d") //kontekst 

let kitchenHor = "a"
let kitchenVer = "b"
let floor = "o"
let testerI = floor
let walls = "p"
let bed = "q"
let fireplace = "s"
let plant = "t"
let playerI = "u"

let arrayI = [
    ["p","p","p","p","p","p","p","p","p","p"], 
    ["p","b","B","B","B","o","o","o","t","p"], 
    ["p","a","o","o","o","o","o","o","o","p"], 
    ["p","A","o","o","a","o","o","o","o","p"], 
    ["p","A","o","o","a","o","o","o","o","u"], 
    ["p","o","o","o","o","o","o","o","o","o"], 
    ["p","t","o","o","o","o","o","o","o","p"], 
    ["p","s","o","o","o","o","o","q","Q","p"], 
    ["p","S","o","o","o","o","o","Q","Q","p"], 
    ["p","p","p","p","p","p","p","p","p","p"], 
]


/*--------------------------------
            Player
------------------------------- */
let playerStatusI = "alive"
let playerPositionI = {xI:0, yI:0}


/*-----------------------------------------------
    Game responsive, depending on screen width
---------------------------------------------- */
let windowsWidthSmallI = window.matchMedia("(max-width: 600px)") 
let windowsWidthMediumI = window.matchMedia("(max-width: 900px)") 
let windowsWidthLargeI = window.matchMedia("(min-width: 900px)") 
let tileSizeI

if(windowsWidthSmallI.matches) {
    tileSizeI = 35;
    canvasI.width= 350
    canvasI.height= 350
} else if (windowsWidthMediumI.matches) {
    tileSizeI = 50;
    canvasI.width= 500
    canvasI.height= 500
} else if(windowsWidthLargeI.matches) {
    tileSizeI = 70;
    canvasI.width = 700
    canvasI.height= 700
}


/*--------------------------------
        On load function
        Stores scored points
        when change of maze
------------------------------- */
let pointsPlaceholder = document.getElementById("points")
let points
let submitScoreBtn = document.getElementById("submitScoreBtn")
let playername

window.onload = function(e){ 
    let storagePoints = localStorage.getItem("points");
    if(storagePoints != null){
        points = parseInt(storagePoints, 10)
    }
    else{
        points = 0  
    }
    pointsPlaceholder.innerHTML = points

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    playername = urlParams.get('playername')
}


/*----------------------------
        Game Touch buttons
--------------------------- */
let wBtn = document.getElementById("wBtn")
let eBtn = document.getElementById("eBtn")
let aBtn = document.getElementById("aBtn")
let sBtn = document.getElementById("sBtn")
let dBtn = document.getElementById("dBtn")
let gameSound = new Audio('FarmingGame/sound/walk.mp3');

wBtn.onclick = function() {
    //up - w
    if(arrayI[playerPositionI.xI][playerPositionI.yI-1] == floor){
        arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
        testerI = arrayI[playerPositionI.xI][playerPositionI.yI -1]
        arrayI[playerPositionI.xI][playerPositionI.yI -1] = playerI
    }
    drawMazeI()
}
eBtn.onclick = function() {
    //interact - e - leave to outside, game.php
    if(playerPositionI.xI == 4 && playerPositionI.yI == 9 || playerPositionI.xI == 5 && playerPositionI.yI == 9) {
        window.location = "game.php?playername=" + playername
    }
}
aBtn.onclick = function() {
    //Left - a
    if(arrayI[playerPositionI.xI-1][playerPositionI.yI] == floor) {
        arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
        testerI = arrayI[playerPositionI.xI-1][playerPositionI.yI]
        arrayI[playerPositionI.xI-1][playerPositionI.yI] = playerI
    }
    drawMazeI()
}
sBtn.onclick = function() {
    //down - s
    if(arrayI[playerPositionI.xI][playerPositionI.yI +1] == floor){
        arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
        testerI = arrayI[playerPositionI.xI][playerPositionI.yI +1]
        arrayI[playerPositionI.xI][playerPositionI.yI +1] = playerI
    }
    drawMazeI()
}
dBtn.onclick = function() {
    //right - d
    if(arrayI[playerPositionI.xI +1][playerPositionI.yI] == floor){
        arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
        testerI = arrayI[playerPositionI.xI +1][playerPositionI.yI]
        arrayI[playerPositionI.xI +1][playerPositionI.yI] = playerI
    }
    drawMazeI()
}

/*----------------------------
        Draw maze, game
--------------------------- */
function drawMazeI() {
    if(playerStatusI == "alive") {
        for(let xI = 0; xI < arrayI.length; xI++) {
            for(let yI = 0; yI <arrayI[xI].length; yI++) {
    
                //Floor and walls
                if(arrayI[xI][yI] == floor) {
                    ctxI.drawImage(floorImgI, tileSizeI*xI, tileSizeI*yI, tileSizeI, tileSizeI)
                }else if(arrayI[xI][yI] == walls) {
                    ctxI.fillStyle = "#302020"
                    ctxI.fillRect(tileSizeI*xI,tileSizeI*yI,tileSizeI,tileSizeI)
                
                }else if(arrayI[xI][yI] == bed) {
                    ctxI.drawImage(bedImgI, tileSizeI*xI, tileSizeI*yI, tileSizeI*2, tileSizeI*2)
                
                //Kitchen
                }else if(arrayI[xI][yI] == kitchenHor) {
                    ctxI.drawImage(kitchenHorImg, tileSizeI*xI, tileSizeI*yI, tileSizeI*3, tileSizeI)
                }else if(arrayI[xI][yI] == kitchenVer) {
                    ctxI.drawImage(kitchenVerImg, tileSizeI*xI, tileSizeI*yI, tileSizeI, tileSizeI*4)
                //fireplace
                }else if(arrayI[xI][yI] == fireplace) {
                    ctxI.drawImage(fireplaceImg, tileSizeI*xI, tileSizeI*yI, tileSizeI*2, tileSizeI)
                //plant
                }else if(arrayI[xI][yI] == plant) {
                    ctxI.drawImage(plantImgI, tileSizeI*xI, tileSizeI*yI, tileSizeI, tileSizeI)
                //player
                }else if(arrayI[xI][yI] == playerI) {
                    playerPositionI.xI = xI
                    playerPositionI.yI = yI
                    ctxI.drawImage(playerImgI, tileSizeI*xI, tileSizeI*yI, tileSizeI, tileSizeI)
                } 
            }   
        } 
    } else if(playerStatusI == "asleep") {
        ctxI.fillStyle = "#6b342d"
        ctxI.fillRect(0,0,600,600)
        // submitScoreBtn.className = "greenButton"

    }
}

/*-------------------------------
        Player movement
        keyboard buttons
-------------------------------*/
document.addEventListener("keyup", function(event) {
        switch(event.keyCode) {
            case 37: //Player moves left
                if(arrayI[playerPositionI.xI-1][playerPositionI.yI] == floor) {
                    arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
                    testerI = arrayI[playerPositionI.xI-1][playerPositionI.yI]
                    arrayI[playerPositionI.xI-1][playerPositionI.yI] = playerI
                }
                drawMazeI()
                break

            case 38: //Player moves up
                if(arrayI[playerPositionI.xI][playerPositionI.yI-1] == floor){
                    arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
                    testerI = arrayI[playerPositionI.xI][playerPositionI.yI -1]
                    arrayI[playerPositionI.xI][playerPositionI.yI -1] = playerI
                }
                drawMazeI()
                break

            case 39: //Player moves right
                if(arrayI[playerPositionI.xI +1][playerPositionI.yI] == floor){
                    arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
                    testerI = arrayI[playerPositionI.xI +1][playerPositionI.yI]
                    arrayI[playerPositionI.xI +1][playerPositionI.yI] = playerI
                }
                drawMazeI()
                break

            case 40: //Player moves down
                if(arrayI[playerPositionI.xI][playerPositionI.yI +1] == floor){
                    arrayI[playerPositionI.xI][playerPositionI.yI] = testerI
                    testerI = arrayI[playerPositionI.xI][playerPositionI.yI +1]
                    arrayI[playerPositionI.xI][playerPositionI.yI +1] = playerI
                }
                drawMazeI()
                break

            case 69: //e, interact - leave to outside game.php
                if(playerPositionI.xI == 4 && playerPositionI.yI == 9 || playerPositionI.xI == 5 && playerPositionI.yI == 9) {
                    window.location = "game.php?playername=" + playername
                }
                break

            default: 
                console.log("Not valid input")
        }
})


/*-------------------------------
        Draw maze on load
-------------------------------*/
window.addEventListener("load", drawMazeI)
