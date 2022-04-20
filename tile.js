export default class Tile {
    #tileEle
    #row
    #col
    constructor(board, num = Math.random() > 0.5 ? 2 : 4){
        this.#tileEle = document.createElement("div");
        this.#tileEle.classList.add("tile");
        this.value = num; 
        board.append(this.#tileEle);
    }

    set row(val){
        this.#row = val;
        this.#tileEle.style.setProperty("--row", val);
    }
    set col(val){
        this.#col = val;
        this.#tileEle.style.setProperty("--col", val);
    }   
}