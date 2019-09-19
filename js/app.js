
const game = new Game();
const startButton = document.getElementById("begin-game");

/* 
Listens for the start button click to beginn the game
 */

startButton.addEventListener("click", () => {
    game.startGame()

    startButton.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});