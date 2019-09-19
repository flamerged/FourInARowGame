
const game = new Game();
const startButton = document.getElementById("begin-game");

startButton.addEventListener("click", () => {
    game.startGame()
    
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});