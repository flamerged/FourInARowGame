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
        players.push(new Player("Player 1", 1, "#e15258", true));
        players.push(new Player("Player 2", 2, "#e59a13", false));
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
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;
    
        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }
    
        if (targetSpace !== null) {
            const game = this;
            game.ready = false;
    
            activeToken.drop(targetSpace, function(){
                game.updateGameState(activeToken, targetSpace);           
            });  
        }              
    }   

    /**
     * Method that checks if the last placed token produced a win
     * @param {Array} allSpaces - Contains the two dimensional array of alls spaces of the board
     * @param {Object} space - contains the space of the last played token
     */
    /* checkForWin(allSpaces, space) {
        const spaceColumn = space.x;
        const spaceRow = space.y;
        const player = space.owner;
        const spacesBelow = allSpaces[spaceColumn].slice(spaceRow+1);
        let samePlayer = 0;
        const amountSpacesLEFT = spaceColumn;
        const amountSpacesRIGHT = allSpaces.length - 1 - spaceColumn;

        //Check for vertical win
        for(let i = 0; i < spacesBelow.length; i += 1) {
            if(spacesBelow[spacesBelow.length-1 - i].owner === null){
                break;
            } else if(spacesBelow[spacesBelow.length-1 - i].owner === player){
                samePlayer += 1;
            } else {
                samePlayer = 0;
                break;
            } 
        }

        if (samePlayer >= 3) {
            return true;
        } else {
            samePlayer = 0;
        }

        //Check for diagonal win in top left and bottom right directions
        for(let i = 0; i < amountSpacesLEFT;i += 1) {
            if(spaceColumn === 0){break}
            if(allSpaces[spaceColumn-1-i][spaceRow-1-i]){
                if(allSpaces[spaceColumn-1-i][spaceRow-1-i].owner === player){
                    samePlayer += 1;
                } else {
                    break;
                } } else {
                    break;
                }
        }

        for(let i = 0; i < amountSpacesRIGHT;i += 1) {
            if(spaceColumn+1 >= allSpaces.length){break}
            if(allSpaces[spaceColumn+1+i][spaceRow-1-i].owner){
                if(allSpaces[spaceColumn+1+i][spaceRow-1-i].owner === null){
                    break;
                } else if(allSpaces[spaceColumn+1+i][spaceRow-1-i].owner === player){
                    samePlayer += 1;
                } else {
                    break;
                }} else{
                    break;
                }
        }

        if (samePlayer >= 3) {
            return true;
        } else {
            samePlayer = 0;
        }

        //Check for diagonal win in top right and bottom left directions
        for(let i = 0; i < amountSpacesLEFT;i += 1) {
            if(spaceColumn === 0){break}
            if(allSpaces[spaceColumn-1-i][spaceRow-1-i].owner === null){
                break;
            }
            if(allSpaces[spaceColumn-1-i][spaceRow-1-i].owner === player){
                samePlayer += 1;
            } else {
                break;
            } 
        }

        for(let i = 0; i < amountSpacesRIGHT;i += 1) {
            if(spaceColumn+1 >= allSpaces.length){break}
            if(allSpaces[spaceColumn+1+i][spaceRow+1+i]){
                if(allSpaces[spaceColumn+1+i][spaceRow+1+i].owner === null){
                    break;
                }
                if(allSpaces[spaceColumn+1+i][spaceRow+1+i].owner === player){
                    samePlayer += 1;
                } else {
                    break;
                }} else {
                    break;
                } 
        }

        if (samePlayer >= 3) {
            return true;
        } else {
            samePlayer = 0;
        }

        //Checks for horizontal
        for(let i = 0; i < amountSpacesLEFT;i += 1) {
            if(spaceColumn === 0){break}
            if(allSpaces[spaceColumn-1-i][spaceRow].owner === null){
                break;
            }
            if(allSpaces[spaceColumn-1-i][spaceRow].owner === player){
                samePlayer += 1;
            } else {
                break;
            } 
        }

        for(let i = 0; i < amountSpacesRIGHT;i += 1) {
            if(spaceColumn+1 >= allSpaces.length){break}
            if(allSpaces[spaceColumn+1+i][spaceRow].owner === null){
                break
            }
            if(allSpaces[spaceColumn+1+i][spaceRow].owner === player){
                samePlayer += 1;
            } else {
                break;
            } 
        }

        if (samePlayer >= 3) {
            return true;
        } else {
            samePlayer = 0;
        }
        return false;
    } */
    checkForWin(target){
    	const owner = target.token.owner;
    	let win = false;
		console.log('checkforwin called');
    	// vertical
    	for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
				console.log(x,y);
				console.log(y+1);
				console.log(y+2);
				console.log(y+3);
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x][y+1].owner === owner && 
    				this.board.spaces[x][y+2].owner === owner && 
    				this.board.spaces[x][y+3].owner === owner) {
                    	win = true;
						console.log(win);
                }           
            }
        }
	
    	// horizontal
    	for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x+1][y].owner === owner && 
    				this.board.spaces[x+2][y].owner === owner && 
    				this.board.spaces[x+3][y].owner === owner) {
                    	win = true;
                }           
            }
        }
		
    	// diagonal
    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x-1][y+1].owner === owner && 
    				this.board.spaces[x-2][y+2].owner === owner && 
    				this.board.spaces[x-3][y+3].owner === owner) {
                    	win = true;
                }           
            }
        }
	
    	// diagonal
    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x-1][y-1].owner === owner && 
    				this.board.spaces[x-2][y-2].owner === owner && 
    				this.board.spaces[x-3][y-3].owner === owner) {
                    	win = true;
                }           
            }
        }
	
    	return win;
    }
    /** 
     * Switches active player. 
     */
    switchPlayers(){
        this.players.forEach(element => element.active = !element.active);
    }

    /** 
     * Displays game over message.
     * @param {string} message - Game over message.      
     */
    gameOver(message){
        $("#game-over")
            .show()
            .textContent = message;
    }
    /** 
     * Updates game state after token is dropped. 
     * @param   {Object}  token  -  The token that's being dropped.
     * @param   {Object}  target -  Targeted space for dropped token.
     */
    updateGameState(token, target) {
        target.mark(token);

        if (!this.checkForWin(target)) {
            console.log('no win');
			this.switchPlayers();
            
            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens');
            }
        } else {
			console.log('win');
            this.gameOver(`${target.owner.name} wins!`)
        }			
    }
}
