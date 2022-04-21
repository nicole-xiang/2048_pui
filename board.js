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
    // get 2D array of board by row
    get boardByRow(){
        return this.#cells.reduce((grid, cell) => {
            grid[cell.row] = grid[cell.row] || []
            grid[cell.row][cell.col] = cell
            return grid
        },[]) 
    }
    // get 2D array of board by col
    get boardByCol(){
        return this.#cells.reduce((grid, cell) => {
            grid[cell.col] = grid[cell.col] || []
            grid[cell.col][cell.row] = cell
            return grid
        },[]) 
    }
}
// cell class
class Cell {
    #cell
    #row
    #col
    #tile
    #mergeTile
    constructor(cell, row, col){
        this.#cell = cell;
        this.#row = row;
        this.#col = col;
    }
    // get position
    get row(){
        return this.#row
    }
    get col(){
        return this.#col
    }
    // get tile
    get tile(){
        return this.#tile
    }
    set tile(val){
        this.#tile = val;
        if (val == null) return
        this.#tile.row = this.#row;
        this.#tile.col = this.#col;
    }
    get mergeTile(){
        return this.#mergeTile;
    }
    set mergeTile(val){
        this.#mergeTile = val;
        if (val == null) return;
        this.#mergeTile.row = this.row;
        this.#mergeTile.col = this.col;
    }
    // valid if tile is null or same value as current 
    isValid(tile){
        if (this.tile == null) return true;
        console.log(this.tile.value)
        console.log(tile.value)
        if (this.mergeTile == null && this.tile.value === tile.value) return true;
        return false;
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
