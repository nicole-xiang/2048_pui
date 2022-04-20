let grid_size = 4;
let cell_gap = 2;
let cell_size = 10;

// export class for import in script.js
// sets board style 
export default class Board {
    #cells
    constructor(board){
        board.style.setProperty("--grid-size", grid_size);
        board.style.setProperty("--cell-size", `${cell_size}vmin`);
        board.style.setProperty("--cell-gap", `${cell_gap}vmin`);
        // create all cells using Cell class; takes in cell, index
        this.#cells = createCells(board).map((cell, index) => {
            return new Cell(cell, index % grid_size, Math.floor(index/grid_size))
        })
    }
    // get all empty cells (no tile) 
    get #emptyCells(){
        return this.#cells.filter(cell => cell.tile == null); 
    }
    // get a random empty cell 
    emptyCell(){
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
        return this.#emptyCells[randomIndex];
    }
}
// cell class
class Cell {
    #cell
    #row
    #col
    #tile
    constructor(cell, row, col){
        this.#cell = cell;
        this.#row = row;
        this.#col = col;
    }
    get tile(){
        return this.#tile
    }
    set tile(val){
        if (val == null) return
        this.#tile = val;
        this.#tile.row = this.#row;
        this.#tile.col = this.#col;
    }
}
// create board cells 
function createCells(board){
    let cells = [];
    // loop through all cells, create div with class name 'cell' 
    for (let i = 0; i < grid_size * grid_size; i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell);
        board.append(cell);
    }
    return cells;
}
