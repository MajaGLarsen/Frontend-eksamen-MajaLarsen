// Prevent scrolling of the page when using arrow keys for the game
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 38:
        case 40:
        case 37:
        case 39:
            event.preventDefault();
            break;

        default:
            break;
    }
});
// As this prevents using the arrow keys in form input fields as well as the scrolling, this is placed here instead of in the main .js file