/*-------------------------------
            Variables 
-------------------------------*/
let playerImg = new Image()
playerImg.src = "FarmingGame/images/player.png"

let grassImg = new Image()
grassImg.src = "FarmingGame/images/grass1.jpg"

let treeImg = new Image()
treeImg.src = "FarmingGame/images/tree.png"

let gravelImg = new Image()
gravelImg.src = "FarmingGame/images/gravel.jpg"

let dirtImg = new Image()
dirtImg.src = "FarmingGame/images/dirt.jpg"

let wheatImg = new Image()
wheatImg.src = 'FarmingGame/images/wheat4.jpg'

let carrotImg = new Image()
carrotImg.src = 'FarmingGame/images/Carrots.png'

let tomatoImg = new Image()
tomatoImg.src = "FarmingGame/images/tomato.png"

let fenceImg = new Image()
fenceImg.src = "FarmingGame/images/fenceGame.png"
let fenceVerticalImg = new Image()
fenceVerticalImg.src = "FarmingGame/images/fenceVertical.png"

let chickenImg = new Image()
chickenImg.src = "FarmingGame/images/chickenWhite.png"

let chickenHouseImg = new Image()
chickenHouseImg.src = "FarmingGame/images/coop.png"

let tractorImg = new Image()
tractorImg.src = "FarmingGame/images/tractor.png"

let farmHouseImg = new Image() 
farmHouseImg.src = "FarmingGame/images/house.png"

let harvestbagImg = new Image()
harvestbagImg.src = "FarmingGame/images/bag.png"

let deadText = document.getElementById("deadText")

let finalScore = document.getElementById("finalScore")

let button = document.querySelector("button")


let endGameStatus = document.getElementById("endGameStatus")



/*-------------------------------
        Actual Game maze
-------------------------------*/
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d") //kontekst 

let array = [
    ["b","b","b","b","b","b","b","b","a","a","g","G","G","G","a","a","a","b","b","b","b","b","b","b","b","b","b","b","b", 3 ," "," "," ","b","l","L","L","b","b","b"], 
    ["l","L","L","b","b","b","a","a","a","a","G","G","G","G","a","a","a","a","a","a","a","a","a","a","b","b","b","b","b"," "," "," "," ","b","L","L","L","b","b","b"], 
    ["L","L","L","b","a","a","a","a","a","a","G","G","G","G","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"," "," "," "," ","a","L","L","L","b","b","b"], 
    ["L","L","L","a","h","a","a","a","a","a","G","G","G","G","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"," "," "," "," ","a","a","a","b","l","L","L"], 
    ["b","b","b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","h","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","L","L","L"], 
    ["b","b","a","a","a","a","h","a","a","a","a","a","h","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","L","L","L"], 
    ["b","b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","a","b"], 
    ["b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","a","b"], 
    ["c","C","C","C","C","C","a","a","dv","D","dv","D","dv","D","dv","D","a","a","a","dv","D","dv","D","dv","D","dv","D","a","a","i","i","i","i","a","a","a","a","a","a","a"], 
    ["C","C","C","C","C","C","a","a","d","D","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","d","D","a","a","i","i","i","i","a","a","a","e","e","e","e"], 
    ["C","C","C","C","C","C","a","a","D","D","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","D","D","a","a","i","i","i","i","a","a","H","e","k","K","e"], 
    ["C","C","C","C","C","C", 1 ,"x","d","D","a","a","f","F","f","F","H","a","a","m","F","m","F","a","a","d","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["C","C","C","C","C","C","x","x","D","D","a","a","F","F","F","F","a","a","a","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["C","C","C","C","C","C","a","a","D","D","a","a","f","F","f","F","a","a","a","m","F","m","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["C","C","C","C","C","C","a","a","D","D","a","a","F","F","F","F","a","a","a","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["C","C","C","C","C","C","a","a","d","D","a","a","f","F","f","F","a","a","a","m","F","m","F","a","a","d","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["C","C","C","C","C","C","a","a","D","D","a","a","F","F","F","F","a","a","a","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["C","C","C","C","C","C","a","a","D","D","a","a","f","F","f","F","a","a","a","m","F","m","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["C","C","C","C","C","C","a","a","D","D","a","a","F","F","F","F","a","a","H","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","e","e","e"], 
    ["C","C","C","C","C","C","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","a","a"], 
    ["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","a","a"], 
    ["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","a","a"], 
    ["b","a","a","a","a","a","a","a","d","D","a","a","f","F","f","F","H","a","a","m","F","m","F","a","a","d","D","a","a","i","i","i","i","a","a","a","a","a","a","a"], 
    ["b","a","a","a","a","a","a","a","D","D","a","a","F","F","F","F","a","a","a","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","e","e","e"], 
    ["b","a","a","a","a","a","a","a","D","D","a","a","f","F","f","F","a","a","a","m","F","m","F","a","a","D","D","a","a","i","i","i","i","a","a","H","e","k","K","e"], 
    ["b","a","a","a","a","a","a","a","D","D","a","a","F","F","F","F","a","a","a","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["b","b","a","a","a","a","a","a","d","D","a","a","f","F","f","F","a","a","a","m","F","m","F","a","a","d","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["b","b","a","a","a","a","a","a","D","D","a","a","F","F","F","F","a","a","a","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["b","b","b","a","a","a","a","a","D","D","a","a","f","F","f","F","a","a","a","m","F","m","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["b","b","b","a","a","a","a","a","D","D","a","a","F","F","F","F","a","a","H","F","F","F","F","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["b","b","b","b","a","a","a","a","d","D","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","d","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["l","L","L","b","b","a","a","a","D","D","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","D","D","a","a","i","i","i","i","a","a","a","e","K","K","e"], 
    ["L","L","L","b","b","b","a","a","dv","D","dv","D","dv","D","dv","D","a","a","a","dv","D","dv","D","dv","D","dv","D","a","a","i","i","i","i","a","a","a","e","e","e","e"], 
    ["L","L","L","l","L","L","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","a","b"], 
    ["b","b","b","L","L","L","b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","b","b"], 
    ["b","b","b","L","L","L","b","b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","a","b","b"], 
    ["b","l","L","L","b","b","b","b","b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","a","l","L","L"], 
    ["b","L","L","L","b","b","b","l","L","L","b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","a","a","b","L","L","L"], 
    ["b","L","L","L","b","b","b","L","L","L","b","b","b","b","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","i","i","i","i","a","b","b","b","L","L","L"], 
    ["b","b","b","b","b","b","b","L","L","L","b","b","b","b","b","b","b","b","b","b","a","a","a","a","a","a","a","a","a","i","i","i","i","b","b","b","b","b","b","b"], 
]

let gravel = "a"
let grass = "b"
let house = "c"
let fence = "d"
let fenceVertical ="dv"
let dirt = "e"
let carrot = "f"
let chickenHouse = "g"
let chicken = "h"
let harvestbag = "H"
let tractorRoad = "i"
let tractorRoad2 = "j"
let wheat = "k"
let tree = "l"
let tomato = "m"
let nothing = " "

//points
let submitScoreBtn = document.getElementById("submitScoreBtn")

//Player and positions
let playerStatus = "alive"
let player1 = 1
let playerPosition = {x:0, y:0}

let playerTopRight = gravel
let playerTopLeft = gravel
let playerBotRight = gravel
let playerBotLeft = gravel

//tractor
let tractor = 3
let tractorPosition = {x:0, y:0}



//Game responsive after widths
let windowsWidthSmall = window.matchMedia("(max-width: 600px)") 
let windowsWidthMedium = window.matchMedia("(max-width: 900px)") 
let windowsWidthLarge = window.matchMedia("(min-width: 900px)") 
let tileSize

if(windowsWidthSmall.matches) {
    tileSize = 8.75;
    canvas.width= 350
    canvas.height= 350
} else if (windowsWidthMedium.matches) {
    tileSize = 12.5;
    canvas.width= 500
    canvas.height= 500
} else if(windowsWidthLarge.matches) {
    tileSize = 17.5;
    canvas.width = 700
    canvas.height= 700
}








/*----------------------------
        Game buttons
--------------------------- */
let wBtn = document.getElementById("wBtn")
let eBtn = document.getElementById("eBtn")
let aBtn = document.getElementById("aBtn")
let sBtn = document.getElementById("sBtn")
let dBtn = document.getElementById("dBtn")
let gameSound = new Audio('FarmingGame/sound/walk.mp3');
let playername



/*----------------------------
      On load function
    Stores scored points
    when change of maze
--------------------------- */
let pointsPlaceholder = document.getElementById("points")
let points
window.onload = function(e){ 
    let storagePoints = localStorage.getItem("points");
    
    if(storagePoints != null){
        points = parseInt(storagePoints, 10)
    }
    else{
        points = 0  
    }
    pointsPlaceholder.innerHTML = points
    submitScoreBtn.className = "submitScoreBtn"
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    playername = urlParams.get('playername')
}


/*---------------------------------------
        Touch buttons functionality
---------------------------------------*/
wBtn.onclick = function() {
    //up - w
    if(array[playerPosition.x][playerPosition.y-1] == tractor || array[playerPosition.x][playerPosition.y-1] == nothing){
        playerStatus = "dead"
        
    } else if((array[playerPosition.x][playerPosition.y-1] == gravel && array[playerPosition.x+1][playerPosition.y-1] == gravel) || (array[playerPosition.x][playerPosition.y -1] == tractorRoad && array[playerPosition.x+1][playerPosition.y -1] == tractorRoad)){
        array[playerPosition.x][playerPosition.y+1] = playerBotLeft
        playerBotLeft = playerTopLeft
        playerTopLeft = array[playerPosition.x][playerPosition.y-1]

        array[playerPosition.x+1][playerPosition.y+1] = playerBotRight
        playerBotRight = playerTopRight
        playerTopRight = array[playerPosition.x+1][playerPosition.y-1]

        array[playerPosition.x][playerPosition.y-1] = player1
        array[playerPosition.x+1][playerPosition.y-1] = "x"
        array[playerPosition.x][playerPosition.y] = "x"
        array[playerPosition.x+1][playerPosition.y] = "x"

        gameSound.play()
    }
    drawMaze()
}
eBtn.onclick = function() {
    //e - points
    let harvestSound = new Audio('FarmingGame/sound/harvest.mp3');
    if(playerPosition.x == 9 && playerPosition.y == 16 || playerPosition.x == 9 && playerPosition.y == 15 || playerPosition.x == 10 && playerPosition.y == 17 || playerPosition.x == 11 && playerPosition.y == 17 || playerPosition.x == 12 && playerPosition.y == 16) {
        //Havest Carrots øverste venstre hjørne 
        updatePoint(1)
        harvestSound.play()
        for(let i = 0; i<8; i++) {
            for(let j = 0; j<4; j++) {
                array[11+i][12+j] = dirt
            }
        }
    } else if(playerPosition.x == 20 && playerPosition.y == 15 || playerPosition.x == 20 && playerPosition.y == 16 || playerPosition.x == 21 && playerPosition.y == 17 || playerPosition.x == 22 && playerPosition.y == 17 || playerPosition.x == 23 && playerPosition.y == 16) {
        // Harvest carrots Øverste højre hjørne
        updatePoint(1)
        harvestSound.play()
        for(let i = 0; i<8; i++) {
            for(let j = 0; j<4; j++) {
                array[22+i][12+j] = dirt
            }
        }
    } else if(playerPosition.x == 27 && playerPosition.y == 17 || playerPosition.x == 28 && playerPosition.y == 16 || playerPosition.x == 29 && playerPosition.y == 16 || playerPosition.x == 30 && playerPosition.y == 17 || playerPosition.x == 30 && playerPosition.y == 18) {
        //Havest tomatoes nederste højre hjørne
        updatePoint(1)
        harvestSound.play()
        for(let i = 0; i<8; i++) {
            for(let j = 0; j<4; j++) {
                array[22+i][19+j] = dirt
            }
        }
    } else if(playerPosition.x == 16 && playerPosition.y == 17 || playerPosition.x == 17 && playerPosition.y == 16 || playerPosition.x == 18 && playerPosition.y == 16 || playerPosition.x == 19 && playerPosition.y == 17 || playerPosition.x == 19 && playerPosition.y == 18) {
        //harvest tomatoes nederste venstre hjørne
        updatePoint(1)
        harvestSound.play()
        for(let i = 0; i<8; i++) {
            for(let j = 0; j<4; j++) {
                array[11+i][19+j] = dirt
            }
        }
    } else if(playerPosition.x == 8 && playerPosition.y == 34 || playerPosition.x == 9 && playerPosition.y == 33 || playerPosition.x == 10 && playerPosition.y == 33 || playerPosition.x == 11 && playerPosition.y == 34) {
        //Harvest wheat, left 
        updatePoint(1)
        for(let i = 0; i<10; i++) {
            for(let j = 0; j<4; j++) {
                array[9+i][36+j] = dirt
            }
        }
        harvestSound.play()
    } else if(playerPosition.x == 22 && playerPosition.y == 34 || playerPosition.x == 23 && playerPosition.y == 33 || playerPosition.x == 24 && playerPosition.y == 33 || playerPosition.x == 25 && playerPosition.y == 34) {
        //Harvest wheat, right bottom
        updatePoint(1)
        harvestSound.play()
        for(let i = 0; i<10; i++) {
            for(let j = 0; j<4; j++) {
                array[23+i][36+j] = dirt
            }
        }
    } else if(playerPosition.x ==10 && playerPosition.y == 6 || playerPosition.x == 11 && playerPosition.y == 6) {
        window.location = "gameInside.php?playername=" + playername
    } else if(playerPosition.x == 1 && playerPosition.y == 14) {
        window.location = "gameCoop.php?playername=" + playername
    }
}
aBtn.onclick = function() {
    //Left - a
    if(array[playerPosition.x-1][playerPosition.y] == tractor || array[playerPosition.x-1][playerPosition.y] == nothing){
        playerStatus = "dead"

    }else if((array[playerPosition.x-1][playerPosition.y] == gravel && array[playerPosition.x-1][playerPosition.y+1] == gravel) || (array[playerPosition.x-1][playerPosition.y] == tractorRoad && array[playerPosition.x-1][playerPosition.y+1] == tractorRoad)) {
        array[playerPosition.x+1][playerPosition.y] = playerTopRight
        playerTopRight = playerTopLeft
        playerTopLeft = array[playerPosition.x-1][playerPosition.y]

        array[playerPosition.x+1][playerPosition.y+1] = playerBotRight
        playerBotRight = playerBotLeft
        playerBotLeft = array[playerPosition.x-1][playerPosition.y+1]

        array[playerPosition.x-1][playerPosition.y] = player1
        array[playerPosition.x][playerPosition.y] = "x"
        array[playerPosition.x-1][playerPosition.y+1] = "x"
        array[playerPosition.x][playerPosition.y+1] = "x"
        gameSound.play()
    }
    drawMaze()
}
sBtn.onclick = function() {
    //down - s  
    if(array[playerPosition.x][playerPosition.y+1] == tractor || array[playerPosition.x][playerPosition.y+1] == nothing){
        playerStatus = "dead"
        
    } else if((array[playerPosition.x][playerPosition.y+2] == gravel && array[playerPosition.x+1][playerPosition.y+2] == gravel) || (array[playerPosition.x][playerPosition.y+2] ==  tractorRoad && array[playerPosition.x+1][playerPosition.y+2] ==  tractorRoad)){
        array[playerPosition.x][playerPosition.y] = playerTopLeft
        playerTopLeft = playerBotLeft
        playerBotLeft = array[playerPosition.x][playerPosition.y+2]

        array[playerPosition.x+1][playerPosition.y] = playerTopRight
        playerTopRight = playerBotRight
        playerBotRight = array[playerPosition.x+1][playerPosition.y+2]

        array[playerPosition.x][playerPosition.y+1] = player1
        array[playerPosition.x+1][playerPosition.y+1] = "x"
        array[playerPosition.x][playerPosition.y+2] = "x"
        array[playerPosition.x+1][playerPosition.y+2] = "x"

        gameSound.play()
    }
    drawMaze()
}
dBtn.onclick = function() {
    //right - d
    if(array[playerPosition.x+1][playerPosition.y] == tractor || array[playerPosition.x+1][playerPosition.y] == nothing){
        playerStatus = "dead"
        
    }else if((array[playerPosition.x+2][playerPosition.y] == gravel && array[playerPosition.x+2][playerPosition.y+1] == gravel) || (array[playerPosition.x +2][playerPosition.y] == tractorRoad && array[playerPosition.x+2][playerPosition.y+1] == tractorRoad)){
        array[playerPosition.x][playerPosition.y] = playerTopLeft
        playerTopLeft = playerTopRight
        playerTopRight = array[playerPosition.x+2][playerPosition.y]

        array[playerPosition.x][playerPosition.y+1] = playerBotLeft
        playerBotLeft = playerBotRight
        playerBotRight = array[playerPosition.x+2][playerPosition.y+1]

        array[playerPosition.x+1][playerPosition.y] = player1
        array[playerPosition.x+2][playerPosition.y] = "x"
        array[playerPosition.x+1][playerPosition.y+1] = "x"
        array[playerPosition.x+2][playerPosition.y+1] = "x"

        gameSound.play()
    }
    drawMaze()
}






/*-------------------------------
        Draw maze, game
-------------------------------*/
function drawMaze() {
    if(playerStatus == "alive") {
        for(let x = 0; x < array.length; x++) {
            for(let y = 0; y <array[x].length; y++) {
                //Gravel and grass
                if(array[x][y] == gravel) {
                    ctx.drawImage(gravelImg, tileSize*x,tileSize*y,tileSize,tileSize)
                } else if(array[x][y] == grass) {
                    ctx.drawImage(grassImg, tileSize*x,tileSize*y,tileSize,tileSize)
                } else if(array[x][y] == tree) {
                    ctx.drawImage(treeImg, tileSize*x,tileSize*y,tileSize*3,tileSize*3)
                
                //House and fence and fence-vertical
                } else if(array[x][y] == house) {
                    ctx.drawImage(farmHouseImg, tileSize*x,tileSize*y,tileSize*12,tileSize*6)
                } else if(array[x][y] == fence) {
                    ctx.drawImage(fenceImg, tileSize*x,tileSize*y,tileSize*4,tileSize*2)
                } else if(array[x][y] == fenceVertical) {
                    ctx.drawImage(fenceVerticalImg, tileSize*x,tileSize*y,tileSize,tileSize*2)
    
                //Dirt, carrot and wheat
                } else if(array[x][y] == dirt) {
                    ctx.drawImage(dirtImg, tileSize*x,tileSize*y,tileSize,tileSize)
                } else if(array[x][y] == wheat) {
                    ctx.drawImage(wheatImg, tileSize*x,tileSize*y,tileSize*8,tileSize*2)
                } else if(array[x][y] == carrot) {
                    ctx.drawImage(carrotImg, tileSize*x,tileSize*y,tileSize*2,tileSize*2)
                } else if(array[x][y] == tomato) {
                    ctx.drawImage(tomatoImg, tileSize*x,tileSize*y,tileSize*2,tileSize*2)
                
                // Chicken and chicken house
                } else if(array[x][y] == chickenHouse) {
                    ctx.drawImage(chickenHouseImg, tileSize*x,tileSize*y,tileSize*4,tileSize*4)
                } else if(array[x][y] == chicken) {
                    ctx.drawImage(chickenImg, tileSize*x,tileSize*y,tileSize,tileSize)
                }else if (array[x][y] == harvestbag) {
                    ctx.drawImage(harvestbagImg, tileSize*x,tileSize*y, tileSize, tileSize)    
    
                //TractorRoad, TractorRoad2 And tractor
                } else if(array[x][y] == tractorRoad) {
                    ctx.fillStyle = "#a8967e"
                    ctx.fillRect(tileSize*x,tileSize*y,tileSize,tileSize)
                } else if(array[x][y] == tractorRoad2) {
                    ctx.fillStyle = "#91826e"
                    ctx.fillRect(tileSize*x,tileSize*y,tileSize,tileSize)
                } else if(array[x][y] == tractor) {
                    tractorPosition.x = x
                    tractorPosition.y = y
                    ctx.drawImage(tractorImg, tileSize*x,tileSize*y,tileSize*4,tileSize*4)
                //players
                } else if(array[x][y] == player1) {
                    playerPosition.x = x
                    playerPosition.y = y
                    ctx.drawImage(playerImg, tileSize*x, tileSize*y, tileSize*2, tileSize*2)
                } 
            }
        } 
    } else if(playerStatus == "dead") {
        localStorage.setItem("points", 0);
        document.getElementById("scoreData").value = points;
        ctx.fillStyle = "#4a0909"
        ctx.fillRect(0,0,720,720)
        deadText.innerHTML = "You died"
        finalScore.innerHTML = "You scored " + points + " points"

        submitScoreBtn.className = "greenButton"
        
        button.style.display = "block"

        let inputfelt = document.querySelector("#point-id")

        inputfelt.value = points

    } else if(playerStatus == "asleep") {
        localStorage.setItem("points", 0);
        ctx.fillStyle = "#6b342d"
        ctx.fillRect(0,0,600,600)
        deadText.innerHTML = "game won"
        finalScore.innerHTML = "You scored " + points + " points"
        
        submitScoreBtn.className = "greenButton"

        button.style.display = "block"

        let inputfelt = document.querySelector("#point-id")

        inputfelt.value = points
    }   
}



/*-------------------------------
        Player movement
        keyboard buttons
-------------------------------*/
document.addEventListener("keyup", function(event) {
        switch(event.keyCode) {
            case 37: //left
                //die if you touch tractor
                if(array[playerPosition.x-1][playerPosition.y] == tractor || array[playerPosition.x-1][playerPosition.y] == nothing){
                    playerStatus = "dead"
                //player walk - depends on the tiles near player
                }else if((array[playerPosition.x-1][playerPosition.y] == gravel && array[playerPosition.x-1][playerPosition.y+1] == gravel) || (array[playerPosition.x-1][playerPosition.y] == tractorRoad && array[playerPosition.x-1][playerPosition.y+1] == tractorRoad)) {
                    array[playerPosition.x+1][playerPosition.y] = playerTopRight
                    playerTopRight = playerTopLeft
                    playerTopLeft = array[playerPosition.x-1][playerPosition.y]

                    array[playerPosition.x+1][playerPosition.y+1] = playerBotRight
                    playerBotRight = playerBotLeft
                    playerBotLeft = array[playerPosition.x-1][playerPosition.y+1]

                    array[playerPosition.x-1][playerPosition.y] = player1
                    array[playerPosition.x][playerPosition.y] = "x"
                    array[playerPosition.x-1][playerPosition.y+1] = "x"
                    array[playerPosition.x][playerPosition.y+1] = "x"
                    gameSound.play()
                }
                drawMaze()
                break

            case 38: //up
                //die if you touch tractor
                if(array[playerPosition.x][playerPosition.y-1] == tractor || array[playerPosition.x][playerPosition.y-1] == nothing){
                    playerStatus = "dead"
                //player walk - depends on the tiles near player
                } else if((array[playerPosition.x][playerPosition.y-1] == gravel && array[playerPosition.x+1][playerPosition.y-1] == gravel) || (array[playerPosition.x][playerPosition.y -1] == tractorRoad && array[playerPosition.x+1][playerPosition.y -1] == tractorRoad)){
                    array[playerPosition.x][playerPosition.y+1] = playerBotLeft
                    playerBotLeft = playerTopLeft
                    playerTopLeft = array[playerPosition.x][playerPosition.y-1]

                    array[playerPosition.x+1][playerPosition.y+1] = playerBotRight
                    playerBotRight = playerTopRight
                    playerTopRight = array[playerPosition.x+1][playerPosition.y-1]

                    array[playerPosition.x][playerPosition.y-1] = player1
                    array[playerPosition.x+1][playerPosition.y-1] = "x"
                    array[playerPosition.x][playerPosition.y] = "x"
                    array[playerPosition.x+1][playerPosition.y] = "x"

                    gameSound.play()
                }
                drawMaze()
                break

            case 39: //right
                //die if you touch tractor
                if(array[playerPosition.x+1][playerPosition.y] == tractor || array[playerPosition.x+1][playerPosition.y] == nothing){
                    playerStatus = "dead"
                //player walk - depends on the tiles near player
                }else if((array[playerPosition.x+2][playerPosition.y] == gravel && array[playerPosition.x+2][playerPosition.y+1] == gravel) || (array[playerPosition.x +2][playerPosition.y] == tractorRoad && array[playerPosition.x+2][playerPosition.y+1] == tractorRoad)){
                    array[playerPosition.x][playerPosition.y] = playerTopLeft
                    playerTopLeft = playerTopRight
                    playerTopRight = array[playerPosition.x+2][playerPosition.y]

                    array[playerPosition.x][playerPosition.y+1] = playerBotLeft
                    playerBotLeft = playerBotRight
                    playerBotRight = array[playerPosition.x+2][playerPosition.y+1]

                    array[playerPosition.x+1][playerPosition.y] = player1
                    array[playerPosition.x+2][playerPosition.y] = "x"
                    array[playerPosition.x+1][playerPosition.y+1] = "x"
                    array[playerPosition.x+2][playerPosition.y+1] = "x"

                    gameSound.play()
                }
                drawMaze()
                break

            case 40: //down
                //die if you touch tractor
                if(array[playerPosition.x][playerPosition.y+1] == tractor || array[playerPosition.x][playerPosition.y+1] == nothing){
                    playerStatus = "dead"
                //player walk - depends on the tiles near player
                } else if((array[playerPosition.x][playerPosition.y+2] == gravel && array[playerPosition.x+1][playerPosition.y+2] == gravel) || (array[playerPosition.x][playerPosition.y+2] ==  tractorRoad && array[playerPosition.x+1][playerPosition.y+2] ==  tractorRoad)){
                    array[playerPosition.x][playerPosition.y] = playerTopLeft
                    playerTopLeft = playerBotLeft
                    playerBotLeft = array[playerPosition.x][playerPosition.y+2]

                    array[playerPosition.x+1][playerPosition.y] = playerTopRight
                    playerTopRight = playerBotRight
                    playerBotRight = array[playerPosition.x+1][playerPosition.y+2]

                    array[playerPosition.x][playerPosition.y+1] = player1
                    array[playerPosition.x+1][playerPosition.y+1] = "x"
                    array[playerPosition.x][playerPosition.y+2] = "x"
                    array[playerPosition.x+1][playerPosition.y+2] = "x"

                    gameSound.play()
                }
                drawMaze()
                break

            /*---------------------
                    Points
            ---------------------*/    
            case 69: //e, interact
                let harvestSound = new Audio('FarmingGame/sound/harvest.mp3');
                if(playerPosition.x == 9 && playerPosition.y == 16 || playerPosition.x == 9 && playerPosition.y == 15 || playerPosition.x == 10 && playerPosition.y == 17 || playerPosition.x == 11 && playerPosition.y == 17 || playerPosition.x == 12 && playerPosition.y == 16) {
                    //Havest Carrots øverste venstre hjørne 
                    updatePoint(1)
                    harvestSound.play()
                    for(let i = 0; i<8; i++) {
                        for(let j = 0; j<4; j++) {
                            array[11+i][12+j] = dirt
                        }
                    }
                } else if(playerPosition.x == 20 && playerPosition.y == 15 || playerPosition.x == 20 && playerPosition.y == 16 || playerPosition.x == 21 && playerPosition.y == 17 || playerPosition.x == 22 && playerPosition.y == 17 || playerPosition.x == 23 && playerPosition.y == 16) {
                    // Harvest carrots Øverste højre hjørne
                    updatePoint(1)
                    harvestSound.play()
                    for(let i = 0; i<8; i++) {
                        for(let j = 0; j<4; j++) {
                            array[22+i][12+j] = dirt
                        }
                    }
                } else if(playerPosition.x == 27 && playerPosition.y == 17 || playerPosition.x == 28 && playerPosition.y == 16 || playerPosition.x == 29 && playerPosition.y == 16 || playerPosition.x == 30 && playerPosition.y == 17 || playerPosition.x == 30 && playerPosition.y == 18) {
                    //Havest tomatoes nederste højre hjørne
                    updatePoint(1)
                    harvestSound.play()
                    for(let i = 0; i<8; i++) {
                        for(let j = 0; j<4; j++) {
                            array[22+i][19+j] = dirt
                        }
                    }
                } else if(playerPosition.x == 16 && playerPosition.y == 17 || playerPosition.x == 17 && playerPosition.y == 16 || playerPosition.x == 18 && playerPosition.y == 16 || playerPosition.x == 19 && playerPosition.y == 17 || playerPosition.x == 19 && playerPosition.y == 18) {
                    //harvest tomatoes nederste venstre hjørne
                    updatePoint(1)
                    harvestSound.play()
                    for(let i = 0; i<8; i++) {
                        for(let j = 0; j<4; j++) {
                            array[11+i][19+j] = dirt
                        }
                    }
                } else if(playerPosition.x == 8 && playerPosition.y == 34 || playerPosition.x == 9 && playerPosition.y == 33 || playerPosition.x == 10 && playerPosition.y == 33 || playerPosition.x == 11 && playerPosition.y == 34) {
                    //Harvest wheat, left 
                    updatePoint(1)
                    for(let i = 0; i<10; i++) {
                        for(let j = 0; j<4; j++) {
                            array[9+i][36+j] = dirt
                        }
                    }
                    harvestSound.play()
                } else if(playerPosition.x == 22 && playerPosition.y == 34 || playerPosition.x == 23 && playerPosition.y == 33 || playerPosition.x == 24 && playerPosition.y == 33 || playerPosition.x == 25 && playerPosition.y == 34) {
                    //Harvest wheat, right bottom
                    updatePoint(1)
                    harvestSound.play()
                    for(let i = 0; i<10; i++) {
                        for(let j = 0; j<4; j++) {
                            array[23+i][36+j] = dirt
                        }
                    }
                } else if(playerPosition.x ==10 && playerPosition.y == 6 || playerPosition.x == 11 && playerPosition.y == 6) {
                    window.location = "gameInside.php?playername=" + playername
                } else if(playerPosition.x == 1 && playerPosition.y == 14) {
                    window.location = "gameCoop.php?playername=" + playername
                }
                break

            default: 
                console.log("Not valid input")
        }
})


/*------------------------------------------
    Function to update scores - points
------------------------------------------*/
function updatePoint(p1){
    points += p1;
    pointsPlaceholder.innerHTML = points
    localStorage.setItem("points", points);
}

/*-------------------------------
         Tractor Controls
-------------------------------*/
setInterval(()=>{
    tractorDrive();
   },200)

let isMovingLeft = true   
function tractorDrive(){
    //Change tractor picture, if tractor is moving left or write
    if(tractorPosition.x -1 < 0 && isMovingLeft) {
        isMovingLeft = !isMovingLeft //fra true til false
        tractorImg.src = "FarmingGame/images/tractor.png"
    } else if(tractorPosition.x +5 > array.length && !isMovingLeft) {
        isMovingLeft = !isMovingLeft //fra false til true
        tractorImg.src = "FarmingGame/images/tractorReverse.png"
    }

    //Tractor moves left
    if(isMovingLeft){ 
        for(let i = 0; i <3; i++) {
            if(playerStatus == "alive" && array[tractorPosition.x-1][tractorPosition.y+i] == player1 ) {
                console.log("You died")
                playerStatus = "dead"
            }
        }

        if(array[tractorPosition.x - 1][tractorPosition.y] == tractorRoad ){
            array[tractorPosition.x ][tractorPosition.y] = " " //tractors new position
            for(let i = 0; i<4; i++) {
                array[tractorPosition.x -1 ][tractorPosition.y+i] = " " 
                array[tractorPosition.x+3 ][tractorPosition.y+i] = tractorRoad
            }
            array[tractorPosition.x - 1 ][tractorPosition.y] = tractor //Tractors new position
        }
        //Tractor moves right
    } else if(!isMovingLeft){ 
        for(let i = 0; i <4; i++) {
            if(playerStatus == "alive" && array[tractorPosition.x+4][tractorPosition.y+i] == player1 ) {
                console.log("You died")
                playerStatus = "dead"
                
            }
        }
        if(array[tractorPosition.x + 4][tractorPosition.y] == tractorRoad){
            array[tractorPosition.x + 1 ][tractorPosition.y] = tractor //Tractors new position
            for(let i = 0; i<4; i++) {
                array[tractorPosition.x +4 ][tractorPosition.y+i] = " " 
                array[tractorPosition.x ][tractorPosition.y+i] = tractorRoad
            }
        }
    } 
        drawMaze();
        
}   


/*-------------------------------------
           Draw Maze on load
-------------------------------------*/
window.addEventListener("load", drawMaze)



