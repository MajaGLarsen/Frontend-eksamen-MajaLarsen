// New user, select the avatar
//variables
let catAvatar = document.getElementById("catAvatar")
let sheepAvatar = document.getElementById("sheepAvatar")
let pigAvatar = document.getElementById("pigAvatar")
let cowAvatar = document.getElementById("cowAvatar")
let duckAvatar = document.getElementById("duckAvatar")
let rabbitAvatar = document.getElementById("rabbitAvatar")
let chickenAvatar = document.getElementById("chickenAvatar")
let horseAvatar = document.getElementById("horseAvatar")

//array over avatars
let avatarArray = [catAvatar, sheepAvatar, pigAvatar, cowAvatar, duckAvatar, rabbitAvatar, chickenAvatar, horseAvatar]

let chosenAvatar

// i - what avatar did the user click - set onclik function on it
// j - What avatar is the user on define what the onclick function does
for(let i=0; i < avatarArray.length; i++) {
    avatarArray[i].onclick = function() {
        for(let j=0; j < avatarArray.length; j++) {
            if(avatarArray[i] == avatarArray[j]) {
                avatarArray[j].style.opacity = 1
                chosenAvatar = avatarArray[j].name
                console.log(chosenAvatar)
                
                document.getElementById("avatardata").value = chosenAvatar;

            } else {
                avatarArray[j].style.opacity = 0.65
            }
        }
    }
}
