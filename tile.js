const colors = {
    2: "#DDE9FE",
    4: "#96DBE0",
    8: "#C3AFEF",
    16: "#FE9A7A",
    32: "#ED6B67",
    64: "#F6A1BA",
    128: "#D54C86",
    256:"#FA7798",
    512: "#FE8100",
    1024: "#FF5815",
    2048: "#E52B55",
    4096: "#B20048"
}
export default class Tile {
    #tileEle
    #row
    #col
    #value
    constructor(board, num = Math.random() > 0.5 ? 2 : 4){
        this.#tileEle = document.createElement("div");
        this.#tileEle.classList.add("tile");
        board.append(this.#tileEle);
        this.value = num; 
    }
    get value(){
        return this.#value;
    }
    // set number value, colors 
    set value(num){
        this.#value = num
        this.#tileEle.textContent = num 
        this.#tileEle.style.setProperty("--bg-color", colors[num]);
        if (num == "2" || num == "4" || num == "8"){
            this.#tileEle.style.setProperty("--num-color", "#4A395F");
        }
        else this.#tileEle.style.setProperty("--num-color", "white");
    }
    // set position
    set row(val){
        this.#row = val;
        this.#tileEle.style.setProperty("--row", val);
    }
    set col(val){
        this.#col = val;
        this.#tileEle.style.setProperty("--col", val);
    }  
}