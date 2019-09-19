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
}