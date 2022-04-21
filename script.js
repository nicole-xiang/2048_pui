import Board from "./board.js"
import Tile from "./tile.js"

let gameBoard = document.getElementById("game-board")
// create new board
let board = new Board(gameBoard)
board.emptyCell().tile = new Tile(gameBoard)
board.emptyCell().tile = new Tile(gameBoard)
setInput()
// set up user input 
function setInput(){
    window.addEventListener("keydown", setEvent, {once: true})
}
// handle user input 
function setEvent(e){
    console.log(e.key);
    switch (e.key){
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveUp()
            break
        case "ArrowRight":
            moveUp()
            break
        case "ArrowLeft":
            moveUp()
            break
        default: 
            setInput()
            return
    }
    setInput()
}