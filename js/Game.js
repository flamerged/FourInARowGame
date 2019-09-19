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
}
