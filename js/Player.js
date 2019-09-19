class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }

    /* 
    This method creates a set of token for the player
    @arg {integer} num - The amount of token to be created
    @return {Array} playToken -  Returns an array of token objects
    */

    createTokens(num) {
        const playerToken = [];

        for(let i = 0; i < num; i += 1) {
            const newToken =  new Token(i, this);
            playerToken[i] = newToken;
        }
        return playerToken;
    }

    /* 
    The getter method returns an array of all unused token
    @return {Array} -  Returns an array of token objects with the dropped property set to false
    */

    get unusedToken() {
        return this.tokens.filter(token => !token.dropped);
    }

    get activeToken() {
        return this.unusedToken[0];
    }

    checkTokens(){
        
    }
}