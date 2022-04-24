import Board from "./board.js"
import Tile from "./tile.js"

let songs = ['music/lofi.mp3','music/pokemon.mp3']; 
$(function(){
    let i = 1;
    if (document.getElementsByClassName('pokemon').length == 0){
        i = 0;
    }
	let music = new Howl({
		src: [songs[i]],
        loop: true,
        // html5: true,
		volume: 0.75
	});

	$("#play").on("click", function(){
        console.log(music);
        if (!music.playing()){
            console.log("start");
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
    $("#prev").on("click", function(){
        music.stop();
        music = new Howl({
            src: songs[0],
            loop: true,
            html5: true,
            volume: 0.75
        });
        music.play();
	});
    $("#next").on("click", function(){
        music.stop();
        music = new Howl({
            src: songs[1],
            loop: true,
            html5: true,
            volume: 0.75
        });
        music.play();
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
function setEvent(e){
    switch (e.key){
        case "ArrowUp":
            moveUp();
            break
        case "ArrowDown":
            moveDown()
            break
        case "ArrowRight":
            moveRight()
            break
        case "ArrowLeft":
            moveLeft()
            break
        default: 
            setInput()
            return
    }
    board.cells.forEach(cell => cell.mergeTiles());
    setInput()
    if (board.emptyCell() != null)
        board.emptyCell().tile = new Tile(gameBoard)
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
    cells.forEach(group => {
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
    })
}
