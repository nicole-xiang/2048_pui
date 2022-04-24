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

const pokemons = {
    2: "images/pikachu.png",
    4: "images/snorlax.jpeg",
    8: "images/spheal.png",
    16: "images/squirtle.png",
    32: "images/psyduck.jpeg",
    64: "images/jigglypuff.png",
    128: "images/shinx.jpeg",
    256:"images/vulpix.png",
    512: "images/minccino.png",
    1024: "images/emolga.png",
    2048: "images/psyduck_funny.jpeg",
    4096: "images/surprised_pikachu.png"
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
    removeTile(){
        this.#tileEle.remove();
    }
    get value(){
        return this.#value;
    }
    // set number value, colors based on mode 
    set value(num){
        this.#value = num
        this.#tileEle.textContent = num 
        if (document.getElementsByClassName('pokemon').length == 0){
            this.#tileEle.style.setProperty("--bg-color", colors[num]);
            if (num == "2" || num == "4" || num == "8"){
                this.#tileEle.style.setProperty("--num-color", "#4A395F");
            }
            else this.#tileEle.style.setProperty("--num-color", "white");
        }
        else{
            this.#tileEle.style.setProperty("--bg-img", `url(${pokemons[num]})`);
            this.#tileEle.style.setProperty("--num-color", "rgba(0, 0, 0, 0)");
        }
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
    // wait for animation to finish then get new tile 
    waitForTransition(animation = false){
        return new Promise(resolve => {
            this.#tileEle.addEventListener(animation? "animationend" : "transitionend", resolve, {once:true})
        })
    }
}