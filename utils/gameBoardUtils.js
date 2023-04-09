import { Tile } from "../classes/minesweeperGame.js";

/**
 * Funtion: To shuffle game array (randomize bombs position in the array)
 * @param {*} array array containing "normal" and "bomb"
 * @returns shuffled game array
 */
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

/**
 * Function: To create an array containing "bomb" and "normal". Array size is dependent on the number of rows and columns provided.
 * @param {*} rowNum Board row size.
 * @param {*} colNum Board column size.
 * @param {*} bombNum Number of board in board.
 * @returns A shuffled game array containing "bomb" and "normal" at randomized position.
 */
function createGameArray(rowNum, colNum, bombNum) {
  let bombArray = new Array(bombNum).fill("bomb");
  let normalArray = new Array(rowNum * colNum - bombNum).fill("normal");
  let gameArray = normalArray.concat(bombArray);
  let shuffledArray = shuffleArray(gameArray);
  return shuffledArray;
}

/**
 * Function: To create game board in game page.
 * This function calls the Tile constructor to create the Tile object.
 * Each Tile object is a <div> with their own x- / y- coordinate.
 * @param {*} rowNum self-explanatory.
 * @param {*} colNum self-explanatory.
 * @param {*} bombNum self-explanatory.
 */
function createBoard(rowNum, colNum, bombNum) {
  // 1. Setup game control section
  document.getElementById("bombCount").innerHTML = String(bombNum).padStart(
    3,
    "0"
  );

  // 2. Setup game tiles -> call Tile constructor
  let gameArray = createGameArray(rowNum, colNum, bombNum);
  console.log("Game's array", gameArray);

  for (let x = 0; x < rowNum; x++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let y = 0; y < colNum; y++) {
      let tile = new Tile(x, y, gameArray.shift() === "bomb" ? true : false);
      row.append(tile.boardTile);
    }

    board.append(row);
  }
  console.log("board", board);
}

export { createGameArray, createBoard };
