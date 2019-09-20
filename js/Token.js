class Token {
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    /* 
        Class method to create the Token HTML Element based on its properties and appending it to the gameboard element. 
     */

    drawHTMLToken() {
        const divElement = document.createElement("div");
        const gameBoard = document.getElementById("game-board-underlay");

        divElement.setAttribute("id", this.id);
        divElement.setAttribute("class", "token");
        divElement.style.backgroundColor = this.owner.color;

        gameBoard.appendChild(divElement);
    }   

    /* 
        Getter method that returns the html element of the token.
     */

    get htmlToken() {
        return document.getElementById(this.id)
    }

    /* 
        Getter method that returns the offsetLeft value of its html element.
     */

    get offsetLeft(){
        return this.htmlToken.offsetLeft;
    }

    /* 
        Method to move the token to the left on the screen.
     */

    moveLeft() {
        if(this.columnLocation > 0){
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        } else {
            console.log("Can't move left");
        }
    }

    /**  
        Method to move the token to the right on the screen.
        @arg {integer} columns - The amount of columns the board is created with. Determines the limit of the token right movement.
     */

    moveRight(columns) {
        if(this.columnLocation < columns -1){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        } else {
            console.log("Can't move Right");
        }
    }

    /** 
     * Drops html token into targeted board space. Marks the token as dropped and the space as occupied by the token.
     * @arg   {Object}   target - Targeted space for dropped token.
     * @arg   {function} reset  - The reset function to call after the drop animation has completed.
     */
    drop(target, reset) {
        this.dropped = true;
        

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        },750, "easeOutBounce", reset);
    }
}