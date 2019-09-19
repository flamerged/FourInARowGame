class Board {
    constructor () {
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();
    }

/* 
    This method generates a two dimensional array of spaces
    @return {array} spaces - A two dimensional array of space objects is returned 
     */
    createSpaces(){
        const spaces = [];
        for(let i = 0; i < this.columns; i += 1){
            const column = [];
            for(let j = 0; j < this.rows; j += 1){
                const space = new Space(i,j);
                column.push(space);
            }
            spaces.push(column);
        }
        return spaces;
    }

    drawHTMLBoard(){
        for(let i = 0; i < this.spaces.length; i += 1) {
            for(let j = 0; j < this.spaces[i].length; j += 1) {
                this.spaces[i][j].drawSVGSpace();
            }
        }
    }
}