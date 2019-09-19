class Token {
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
    }

    drawHTMLToken() {
        const divElement = document.createElement("div");
        const gameBoard = document.getElementById("game-board-underlay");

        divElement.setAttribute("id", this.id);
        divElement.setAttribute("class", "token");
        divElement.style.backgroundColor = this.owner.color;

        gameBoard.appendChild(divElement);
    }   

    get htmlToken() {
        return document.getElementById(`${this.id}`)
    }
}