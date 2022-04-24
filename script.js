import Board from "./board.js"
import Tile from "./tile.js"

// howler: referred to https://github.com/goldfire/howler.js#examples
let songs = ['music/lofi.mp3','music/pokemon.mp3']; 
$(function(){
    let i = 1;
    if (document.getElementsByClassName('pokemon').length == 0){
        i = 0;
    }
	let music = new Howl({
		src: [songs[i]],
        loop: true,
        html5: true,
		volume: 0.75
	});

	$("#play").on("click", function(){
        if (!music.playing()){
            music.play();
        }
	});

	$("#pause").on("click", function(){
		music.pause();
	});

	$("#volup").on("click", function(){
		var vol = music.volume();
		vol += 0.1;
		if (vol > 1) {
			vol = 1;
		}
		music.volume(vol);
	});

	$("#voldown").on("click", function(){
		var vol = music.volume();
		vol -= 0.1;
		if (vol < 0) {
			vol = 0;
		}
		music.volume(vol);
	});
});

let gameBoard = document.getElementById("game-board")
// create new board or get existing board
// let board = localStorage.getItem('board');
// if (board){
//     // pass 
// }
// else {
//     board = new Board(gameBoard)
//     board.emptyCell().tile = new Tile(gameBoard)
//     board.emptyCell().tile = new Tile(gameBoard)
//     console.log(board);
//     localStorage.setItem('board',JSON.stringify(board));
// }
let board = new Board(gameBoard)
board.emptyCell().tile = new Tile(gameBoard)
board.emptyCell().tile = new Tile(gameBoard)
setInput();
// set up user input 
function setInput(){
    window.addEventListener("keydown", setEvent, {once: true})
}
// handle user input
// wait for animation/movement, then add new tile  
async function setEvent(e){
    switch (e.key){
        case "ArrowUp":
            if (!canMoveUp()){
                setInput();
                return; 
            }
            await moveUp();
            break
        case "ArrowDown":
            if (!canMoveDown()){
                setInput();
                return; 
            }
            await moveDown()
            break
        case "ArrowRight":
            if (!canMoveRight()){
                setInput();
                return; 
            }
            await moveRight()
            break
        case "ArrowLeft":
            if (!canMoveLeft()){
                setInput();
                return; 
            }
            await moveLeft()
            break
        default: 
            setInput()
            return
    }
    board.cells.forEach(cell => cell.mergeTiles());
    let newTile = new Tile(gameBoard); 
    if (board.emptyCell() != null){
        board.emptyCell().tile = newTile;
    }
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()){
        newTile.waitForTransition(true).then(()=>{
            alert("you lose");
        });
        return
    }
    setInput();
}

function canMoveUp() {
    return validMove(board.boardByCol);
}
function canMoveDown() {
    return validMove(board.boardByCol.map(row => [...row].reverse()));
}
function canMoveLeft() {
    return validMove(board.boardByRow);
}
function canMoveRight() {
    return validMove(board.boardByRow.map(col => [...col].reverse()));
}
function validMove(cells){
    return cells.some(group => {
        return group.some((cell,index)=>{
            // can't move top cell 
            if (index === 0) return false;
            // can't move empty cell 
            if (cell.tile == null) return false; 
            // potential cell 
            const targetCell = group[index-1];
            return targetCell.isValid(cell.tile); 
        })
    })
}
function moveUp(){
    return slideTiles(board.boardByCol)
}
function moveDown(){
    return slideTiles(board.boardByCol.map(row => [...row].reverse()))
}
function moveLeft(){
    return slideTiles(board.boardByRow)
}
function moveRight(){
    return slideTiles(board.boardByRow.map(col => [...col].reverse()))
}
// slide cells 
function slideTiles(cells){
    return Promise.all(
    // flatten into 1D array
    cells.flatMap(group => {
        const promises = [];
        for (let i = 1; i < group.length; i++){
            const cell = group[i]
            if (cell.tile == null) continue
            let targetCell = null 
            // loop through rest of cells 
            for (let j = i-1; j >=0; j--){
                const possCell = group[j] // get potential cell 
                if (!possCell.isValid(cell.tile)) break;
                targetCell = possCell;
            }
            // if there is a place to move to 
            if (targetCell != null){
                // add movement/animation to promises array
                promises.push(cell.tile.waitForTransition());
                // merge if tile exists in target cell
                if (targetCell.tile != null){
                    targetCell.mergeTile = cell.tile;
                    board.calcScore(targetCell.mergeTile);
                } 
                else {
                    targetCell.tile = cell.tile // move + sets target cell
                }
                // gets rid of the current tile 
                cell.tile = null
            }
        }
        return promises; 
    }))
}
