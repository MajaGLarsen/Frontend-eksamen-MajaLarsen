/*-------------------------------
       Show/Hide control btns
------------------------------ */
//variables
let controldiv = document.getElementById("gameControls")
let showHideKeysBtn = document.getElementById("showHideKeysBtn")

let controlKeyShows = true

let windowWith = window.matchMedia("(min-width: 800px)") //window width, checks if window with is smaller or larger than 800px

if(windowWith.matches) {
    showHideKeysBtn.innerHTML = "Show controls" 
} else {
    showHideKeysBtn.innerHTML = "Hide controls" 
}

// showHideKeysBtn.addEventListener("click", showHideButton())
showHideKeysBtn.onclick = function(x) {
    //If window match a minimum width of 800px
    if(windowWith.matches) {
        if(controlKeyShows == true) {
            controldiv.style.display="flex"
            showHideKeysBtn.innerHTML = "Hide controls"
        } else {
            controldiv.style.display="none"   
            showHideKeysBtn.innerHTML = "Show controls"
        }
        controlKeyShows = !controlKeyShows 
    //If window doesn't match a minimum width of 800px
    } else if(!windowWith.matches) {
        if(controlKeyShows == true) {
            controldiv.style.display="none"
            showHideKeysBtn.innerHTML = "Show controls"
        } else {
            controldiv.style.display="flex"  
            showHideKeysBtn.innerHTML = "Hide controls" 
        }
        controlKeyShows = !controlKeyShows
    }
    console.log(controlKeyShows)

}



/*-------------------------------
   Show/Hide all Time highscore
------------------------------ */
//variables
let allTimeHighscorePopUp = document.getElementById("allTimeHighscorePopUp")

//close the all time highscore list
let closeHighscoreBtn = document.getElementById("closeHighscoreBtn")

let allTimeHighscorePopUpBtn = document.getElementById("allTimeHighscorePopUpBtn")

let allTimeHighscorePopUpBtnPressed = false

allTimeHighscorePopUpBtn.onclick = function() {
    if(!allTimeHighscorePopUpBtnPressed) {
        allTimeHighscorePopUp.style.display = "flex"
        closeHighscoreBtn.onclick = function() {
            allTimeHighscorePopUp.style.display = "none" 
        }
    } else if(allTimeHighscorePopUpBtnPressed) {
        allTimeHighscorePopUp.style.display = "none"      
    }
}




/*----------------------------
        show/hide help
-----------------------------*/
//variables
let showHelpBtn = document.getElementById("showHelpBtn")
let helpPopUp = document.getElementById("helpPopUp")
let closeHelpBtn = document.getElementById("closeHelpBtn")

showHelpBtnPressed = false

showHelpBtn.onclick = function() {
    if(!showHelpBtnPressed) {
        helpPopUp.style.display = "flex"
        closeHelpBtn.onclick = function() {
            helpPopUp.style.display = "none"
            showHelpBtnPressed = !showHelpBtnPressed
        }
    } else if (showHelpBtnPressed) {
        helpPopUp.style.display = "none"
    }
    showHelpBtnPressed = !showHelpBtnPressed
}