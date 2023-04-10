import { Tile } from "../classes/minesweeperGame.js";

/****************************************************************************
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

/****************************************************************************
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

/****************************************************************************
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
    4,
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

/****************************************************************************
 * Function: Set up timer display in DOM.
 */
function timer(timeInSeconds) {
  let minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
  let seconds = String(timeInSeconds % 60).padStart(2, "0");
  let time = `${minutes}:${seconds}`;

  document.getElementById("timer").innerHTML = time;
}

/****************************************************************************
 * Function: Update timer display in DOM after game starts.
 */
function startTimer(hasTimer, timeInSeconds, gameStatus) {
  let timerId = setInterval(() => {
    console.log("I am in setInterval");

    // Count down timer
    if (hasTimer && timeInSeconds > 0) {
      timeInSeconds--;
      timer(timeInSeconds);
      return;
    }
    // If timer is not required: start counting up until game ends
    else if (!hasTimer && gameStatus !== "ended") {
      timeInSeconds++;
      timer(timeInSeconds);
      return;
    }

    clearInterval(timerId);
  }, 1000);

  return timerId;
}

/****************************************************************************
 * Function: Toggle smiley-img on click
 * @param {*} div This function takes in a div representing the tile that has been clicked on to examine if it contains a bomb in its classList.
 */
function toggleSmiley(div) {
  if (div.classList.contains("bomb")) {
    document.getElementById("smiley-img").src = "../images/crying-emoji.png";
    return;
  }

  document.getElementById("smiley-img").src = "../images/tongue-out-emoji.png";
  document.getElementById("smiley-img").classList.add("active");

  let timeoutId = setTimeout(() => {
    document.getElementById("smiley-img").src =
      "../images/smiley-face-tears-joy.png";
    document.getElementById("smiley-img").classList.remove("active");
    clearTimeout(timeoutId);
  }, 200);
}

export { createGameArray, createBoard, timer, startTimer, toggleSmiley };
