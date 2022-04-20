import Board from "./board.js"
import Tile from "./tile.js"

let gameBoard = document.getElementById("game-board")
// create new board
let board = new Board(gameBoard)
board.emptyCell().tile = new Tile(gameBoard)
board.emptyCell().tile = new Tile(gameBoard)
console.log(board.emptyCell())