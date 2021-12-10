//Navbar - open and close, hide and show when the navbar is collapsed
//variables
let navRight = document.getElementById("navRight")
let burgerBars = document.getElementById("burgerBars")
let burgerImg = document.getElementById("burgerImg")

let burgerBarOpen = false


//Open close, hide and show function
burgerBars.onclick = function() {
    if(!burgerBarOpen) {
        navRight.style.display ="flex"
        burgerImg.src ="img/burgerCross.png"
    }
    else {
        navRight.style.display ="none"
        burgerImg.src ="img/burgerbars.png"
    }
    burgerBarOpen = !burgerBarOpen

}
