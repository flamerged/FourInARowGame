class Game {
    constructor () {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    /* 
    Creates two new player objects for the Game
    @retun {array} players - Returns the array containing the new player objects
 */

    createPlayers(){
        const players = [];
        players.push(new Player("Player 1", 1,"#e15258", true));
        players.push(new Player("Player 2", 2, "#e59a13", 2));
        return players;
    }

    /** 
    * Method that initializes the game. 
    */
    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    /* 
    Gets a Player that is active
    @return {Player} -  Returns a Player object with the active property set to true
    */

    get activePlayer() {
        return this.players.find(player => player.active);
    }

    /**  
    * Receives the value of the keydown event. If one of the three arrow keys is pressed it will use methods to move the token on the screen.
    * @arg {string} key - String value for that represents the key that is being pressed on the keyboard.
    */

    handleKeydown(key) {
        if(this.ready) {
            if(key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if(key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if(key === "ArrowDown") {
                this.playToken();
            } 

        } else {
            console.log("Game is not ready yet");
        }
    }

    /* 
    * Is called when the down key is pressed. It it finds the downmost empty space in the column that the player wants to place the token 
    and pases it together with the reset function to the drop method of the token.
    */
    playToken() {
        const tokenColumn = this.activePlayer.activeToken.columnLocation;
        const spaces = this.board.spaces[tokenColumn];
        const emptySpaces = spaces.filter(space => space.token === null);
        console.log(emptySpaces);

        if(emptySpaces){
            this.ready = false;
            this.activePlayer.activeToken.drop(emptySpaces.slice(-1)[0], () => console.log("No reset function yet"));
        } else {
            alert("Column is full");
        }
    }   
}
