import { Tile } from "../classes/minesweeperGame.js";

/******************** Function: Shuffle array ****************************/
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/****************** Function: Create game array ***************************/
function createGameArray(rowNum, colNum, bombNum) {
  let bombArray = new Array(bombNum).fill("bomb");
  let normalArray = new Array(rowNum * colNum - bombNum).fill("normal");
  let gameArray = normalArray.concat(bombArray);
  let shuffledArray = shuffleArray(gameArray);
  return shuffledArray;
}

/********************** Function: Create game board ************************/
function createBoard(rowNum, colNum, bombNum) {
  // execute createGameArray function
  let gameArray = createGameArray(rowNum, colNum, bombNum);
  console.log("game array", gameArray);
  // loop through row / col -> call Tile constructor
  for (let x = 0; x < rowNum; x++) {
    let row = document.createElement("div");
    board.append(row);
    for (let y = 0; y < colNum; y++) {
      let tile = new Tile(x, y, gameArray.shift() === "bomb" ? true : false);
      row.append(tile.boardTile);
    }
  }
  console.log("board", board);
}

export { createGameArray, createBoard };
