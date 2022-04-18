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
}
// 
class Cell {
    #cell
    #x
    #y
    constructor(cell, x, y){
        this.#cell = cell;
        this.#x = x;
        this.#y = y;
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
