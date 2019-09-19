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
        const players = [];
        players.push(new Player(name = "Player 1", color = "#e15258", id = 1, active = true));
        players.push(new Player(name = "Player 2", color = "#e59a13", id = 2));
        return players;
    }

    startGame(){

    }

    /* 
    Gets a Player that is active
    @return {Player} -  Returns a Player object with the active property set to true
    */

    get activePlayer() {
        return this.players.find(player => player.active);
    }
}
