/*-------------------------------
            Variables 
-------------------------------*/
let playerImgC = new Image()
playerImgC.src = "FarmingGame/images/girlInside.png"

let floorImgC = new Image()
floorImgC.src = "FarmingGame/images/floor.png"

let chickenWhiteImg = new Image()
chickenWhiteImg.src = "FarmingGame/images/ChickenWhiteCoop.png"

let chickenBlackImg = new Image()
chickenBlackImg.src = "FarmingGame/images/chickenBlackCoop.png"

let foodBowlEmptyImg = new Image()
foodBowlEmptyImg.src = "FarmingGame/images/foodCoopEmpty.png"

let foodBowlFilledImg = new Image()
foodBowlFilledImg.src = "FarmingGame/images/foodCoopFilled.png"

let waterBowlEmptyImg = new Image()
waterBowlEmptyImg.src = "FarmingGame/images/waterCoopEmpty.png"

let waterBowlFilledImg = new Image()
waterBowlFilledImg.src = "FarmingGame/images/waterCoopFilled.png"

let planImgC = new Image()
planImgC.src = "FarmingGame/images/plant.png"

/*-------------------------------
            Canvas
-------------------------------*/
let canvasCoop = document.getElementById("canvasCoop")
let ctxC = canvasCoop.getContext("2d") //kontekst 
let arrayC = [
    ["p","p","p","p","p","p","p","p"], 
    ["p","o","b","o","o","o","t","p"], 
    ["p","t","o","o","b","o","o","p"], 
    ["p","c","o","o","o","o","o","u"], 
    ["p","o","o","o","o","a","o","o"], 
    ["p","o","o","o","o","o","a","p"], 
    ["p","e","E","o","a","o","t","p"], 
    ["p","p","p","p","p","p","p","p"], 
]

let floor = "o"
let walls = "p"
let plant = "t"
let playerC = "u"
let chickenWhite = "a"
let chickenBlack = "b"
let waterEmpty = "c"
let waterFilled = "d"
let foodEmpty = "e"
let foodFilled = "f"

let testerC = floor


//Player
let playerStatusC = "alive"
let playerPositionC = {xC:0, yC:0}


/*----------------------------------------
Game responsive depending on screen width 
----------------------------------------*/
let windowsWidthSmallC = window.matchMedia("(max-width: 600px)") 
let windowsWidthMediumC = window.matchMedia("(max-width: 900px)") 
let windowsWidthLargeC = window.matchMedia("(min-width: 900px)") 
let tilesizeC

if(windowsWidthSmallC.matches) {
    tilesizeC = 43.75
    canvasCoop.width= 350
    canvasCoop.height= 350
    console.log("1")
} else if (windowsWidthMediumC.matches) {
    tilesizeC = 62.5
    canvasCoop.width= 500
    canvasCoop.height= 500
    console.log("2")
} else if(windowsWidthLargeC.matches) {
    tilesizeC = 87.5
    canvasCoop.width = 700
    canvasCoop.height= 700
    console.log("3")
}


/*----------------------------
      On load function
    Stores scored points
    when change of maze
--------------------------- */
let points
let pointsPlaceholder = document.getElementById("points")
let playername

window.onload = function(e){ 
    let storagePoints = localStorage.getItem("points");
    if(storagePoints != null){
        points = parseInt(storagePoints, 10);
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
    Game touch buttons
--------------------------- */
let wBtn = document.getElementById("wBtn")
let eBtn = document.getElementById("eBtn")
let aBtn = document.getElementById("aBtn")
let sBtn = document.getElementById("sBtn")
let dBtn = document.getElementById("dBtn")
let gameSound = new Audio('FarmingGame/sound/walk.mp3');

wBtn.onclick = function() {
    //up - w
    if(arrayC[playerPositionC.xC][playerPositionC.yC-1] == floor){
        arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
        testerC = arrayC[playerPositionC.xC][playerPositionC.yC -1]
        arrayC[playerPositionC.xC][playerPositionC.yC -1] = playerC
    }
    drawMazeC()
}
eBtn.onclick = function() {
    //Interact - e, points
    if(playerPositionC.xC == 4 && playerPositionC.yC == 9 || playerPositionC.xC == 5 && playerPositionC.yC == 9) {
        window.location = "game.php?playername=" + playername
    } else if(playerPositionC.xC == 3 && playerPositionC.yC == 2 || playerPositionC.xC == 4 && playerPositionC.yC == 1) {
        arrayC[3][1] = waterFilled
        updatePoint(1)
    } else if(playerPositionC.xC == 5 && playerPositionC.yC == 1 || playerPositionC.xC == 5 && playerPositionC.yC == 2 || playerPositionC.xC == 6 && playerPositionC.yC == 3) {
        for(let i = 0; i<2; i++) {
            arrayC[6][1] = foodFilled
        }
        updatePoint(1)
    } else if(playerPositionC.xC == 3 && playerPositionC.yC == 7 || playerPositionC.xC == 4 && playerPositionC.yC == 7) {
        window.location = "game.php?playername=" + playername  
    }
}
aBtn.onclick = function() {
    //Left - a
    if(arrayC[playerPositionC.xC-1][playerPositionC.yC] == floor) {
        arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
        testerC = arrayC[playerPositionC.xC-1][playerPositionC.yC]
        arrayC[playerPositionC.xC-1][playerPositionC.yC] = playerC
    }
    drawMazeC()
}
sBtn.onclick = function() {
    //down - s
    if(arrayC[playerPositionC.xC][playerPositionC.yC +1] == floor){
        arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
        testerC = arrayC[playerPositionC.xC][playerPositionC.yC +1]
        arrayC[playerPositionC.xC][playerPositionC.yC +1] = playerC

        gameSound.play()
    }
    drawMazeC()
}
dBtn.onclick = function() {
    //right - d
    if(arrayC[playerPositionC.xC +1][playerPositionC.yC] == floor){
        arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
        testerC = arrayC[playerPositionC.xC +1][playerPositionC.yC]
        arrayC[playerPositionC.xC +1][playerPositionC.yC] = playerC
    }
    drawMazeC()
}




/*-------------------------------
        Draw maze - game
-------------------------------*/
function drawMazeC() {
    if(playerStatusC == "alive") {
        for(let xC = 0; xC < arrayC.length; xC++) {
            for(let yC = 0; yC <arrayC[xC].length; yC++) {
    
                //Floor and walls
                if(arrayC[xC][yC] == floor) {
                    ctxC.drawImage(floorImgC,tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC)
                }else if(arrayC[xC][yC] == walls) {
                    ctxC.fillStyle = "#302020"
                    ctxC.fillRect(tilesizeC*xC,tilesizeC*yC,tilesizeC,tilesizeC)
                }else if(arrayC[xC][yC] == plant) {
                    ctxC.drawImage(planImgC, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC)
                
                    //Empty water and food
                }else if(arrayC[xC][yC] == waterEmpty) {
                    ctxC.drawImage(waterBowlEmptyImg, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC)
                    
                }else if(arrayC[xC][yC] == waterFilled) {
                    ctxC.drawImage(waterBowlFilledImg, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC)
                    
                }else if(arrayC[xC][yC] == foodEmpty) {
                    ctxC.drawImage(foodBowlEmptyImg, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC*2)
                    
                }else if(arrayC[xC][yC] == foodFilled) {
                    ctxC.drawImage(foodBowlFilledImg, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC*2)
                    
                    //chickens
                }else if(arrayC[xC][yC] == chickenWhite) {
                    ctxC.drawImage(chickenWhiteImg, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC)
                }else if(arrayC[xC][yC] == chickenBlack) {
                    ctxC.drawImage(chickenBlackImg, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC)
                    
                    //player
                }else if(arrayC[xC][yC] == playerC) {
                    playerPositionC.xC = xC
                    playerPositionC.yC = yC
                    ctxC.drawImage(playerImgC, tilesizeC*xC, tilesizeC*yC, tilesizeC, tilesizeC)
                } 
            }   
        } 
    } else if(playerStatusC == "asleep") {
        ctxC.fillStyle = "#6b342d"
        ctxC.fillRect(0,0,720,720)
    }
    
}


/*-------------------------------
        Player movement
        keyboard buttons
-------------------------------*/
document.addEventListener("keyup", function(event) {
        switch(event.keyCode) {
            case 37: //Player moves left
                if(arrayC[playerPositionC.xC-1][playerPositionC.yC] == floor) {
                    arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
                    testerC = arrayC[playerPositionC.xC-1][playerPositionC.yC]
                    arrayC[playerPositionC.xC-1][playerPositionC.yC] = playerC
                }
                drawMazeC()
                break

            case 38: //Player moves up
                if(arrayC[playerPositionC.xC][playerPositionC.yC-1] == floor){
                    arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
                    testerC = arrayC[playerPositionC.xC][playerPositionC.yC -1]
                    arrayC[playerPositionC.xC][playerPositionC.yC -1] = playerC
                }
                drawMazeC()
                break

            case 39: //Player moves right
                if(arrayC[playerPositionC.xC +1][playerPositionC.yC] == floor){
                    arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
                    testerC = arrayC[playerPositionC.xC +1][playerPositionC.yC]
                    arrayC[playerPositionC.xC +1][playerPositionC.yC] = playerC
                }
                drawMazeC()
                break

            case 40: //Player moves down
                if(arrayC[playerPositionC.xC][playerPositionC.yC +1] == floor){
                    arrayC[playerPositionC.xC][playerPositionC.yC] = testerC
                    testerC = arrayC[playerPositionC.xC][playerPositionC.yC +1]
                    arrayC[playerPositionC.xC][playerPositionC.yC +1] = playerC
                }
                drawMazeC()
                break

            case 69: //e, interact, points
                //change to outside
                if(playerPositionC.xC == 3 && playerPositionC.yC == 7 || playerPositionC.xC == 4 && playerPositionC.yC == 7) {
                    window.location = "game.php?playername=" + playername
                //points for filling water bowl
                } else if(playerPositionC.xC == 3 && playerPositionC.yC == 2 || playerPositionC.xC == 4 && playerPositionC.yC == 1) {
                    arrayC[3][1] = waterFilled
                    updatePoint(1)
                //Points for filling food
                } else if(playerPositionC.xC == 5 && playerPositionC.yC == 1 || playerPositionC.xC == 5 && playerPositionC.yC == 2 || playerPositionC.xC == 6 && playerPositionC.yC == 3) {
                    for(let i = 0; i<2; i++) {
                        arrayC[6][1] = foodFilled
                    }
                    updatePoint(1)
                } 
                break

            default: 
                console.log("Not valid input")
        }
})

/*-----------------------------------
    Function to update score points
-----------------------------------*/
function updatePoint(p1){
    points += p1;
    pointsPlaceholder.innerHTML = points
    localStorage.setItem("points", points);
}

/*-----------------------------------
    Draw maze - game - on load
-----------------------------------*/
window.addEventListener("load", drawMazeC)

