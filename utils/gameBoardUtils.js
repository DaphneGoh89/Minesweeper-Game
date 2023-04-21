import { Tile } from "../classes/minesweeperGame.js";
import { minesweeperGame } from "../script.js";
import { revealBombs } from "./gameLeftClickUtils.js";

/****************************************************************************
 * Function: To shuffle game array (randomize bombs position in the array)
 * @param {*} array array containing "normal" and "bomb"
 * @returns shuffled game array
 ****************************************************************************/
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
 ****************************************************************************/
function createGameArray(rowNum, colNum, bombNum) {
  let bombArray = new Array(parseInt(bombNum)).fill("bomb");
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
 ****************************************************************************/
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

    document.getElementById("tile-board").append(row);
  }
  document.getElementById("board").classList.add("active");
  console.log("board", board);
}

/****************************************************************************
 * Function: Set up timer display in DOM.
 ****************************************************************************/
function timer(timeInSeconds) {
  let minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
  let seconds = String(timeInSeconds % 60).padStart(2, "0");
  let time = `${minutes}:${seconds}`;

  document.getElementById("timer").innerHTML = time;
}

/****************************************************************************
 * Function: Update timer display in DOM after game starts.
 ****************************************************************************/
let timerId;
function startTimer(hasTimer, timeInSeconds, gameStatus) {
  clearInterval(timerId);

  timerId = setInterval(() => {
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
}

/****************************************************************************
 * Function: Toggle smiley-img on click
 * @param {*} div This function takes in a div representing the tile that has been clicked on to examine if it contains a bomb in its classList.
 ****************************************************************************/
function toggleSmiley(div) {
  if (div === undefined) {
    document.getElementById("smiley-img").src =
      "../images/smiley-face-tears-joy.png";
  } else if (div.classList.contains("bomb")) {
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

/*****************************************************************************
 * Function: Check winning of game on every tile click.
 * If number of tiles containing bomb revealed = total number of bombs
 ****************************************************************************/
function checkWin(tile) {
  if (
    document.querySelectorAll("[data-status = 'flagged'].bomb").length ==
    minesweeperGame.gameBombNum
  ) {
    endGameAction(tile);
  }
}

/*******************************************************************************
 * Function: Actions to perform on winning game.
 * 1. Stop timer.
 * 2. Disable all click events on hidden and flagged tiles.
 * 3. Show confetti
 * 4. Create div to show winning/ losing game message
 * 5. Show overlay and game-winning modal after delay.
 *******************************************************************************/
// 1.
function stopTimer() {
  clearInterval(timerId);
}

//-----------------------------------------------------------------------------
// 2.
function disableTileClick() {
  const tilesToDisable = document.querySelectorAll(
    "[data-status='hidden'], [data-status='flagged']"
  );

  tilesToDisable.forEach((tile) => (tile.style["pointer-events"] = "none"));
}

//-----------------------------------------------------------------------------
// 3.
function showConfetti() {
  const JSConfetti = window.JSConfetti;
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    emojis: ["🌸", "✨"],
    emojiSize: 30,
    confettiNumber: 1000,
  });
}

//-----------------------------------------------------------------------------
// 4.
function createGameEndMessage(status) {
  // remove game-win node from existing context
  let game_end_content;
  if (document.getElementById("game-end-content")) {
    let game_end_content = document.getElementById("game-end-content");
    game_end_content.parentNode.removeChild(game_end_content);
  }

  let game_end = document.getElementById("game-end-content-container");
  let play_again_btn = document.getElementById("btn-play-again");

  // Main container - contains message and stars
  game_end_content = document.createElement("div");
  game_end_content.id = "game-end-content";
  game_end_content.classList.add("modal-body");

  // Message container
  let message = document.createElement("h1");
  message.innerHTML = status === "win" ? "You won!" : "You lose...";

  // Stars container
  let star_container = document.createElement("div");
  star_container.id = "star-container";
  star_container.classList.add(status === "win" ? "game-win" : "game-lose");

  // Create stars
  for (let i = 0; i < 3; i++) {
    let star = document.createElement("img");
    star.setAttribute(
      "src",
      status === "win" ? "./images/star.png" : "./images/grey_star.png"
    );
    star_container.append(star);
  }

  // Append final container to game-end modal
  game_end_content.append(message);
  game_end_content.append(star_container);
  game_end.insertBefore(game_end_content, play_again_btn);
  // game_end.append(game_win);
  document.getElementById("game-end-content").classList.add("active");
}

//-----------------------------------------------------------------------------
// 5.
function endGameAction(tile) {
  stopTimer();
  disableTileClick();

  // 3.
  if (tile.classList.contains("bomb") && tile.dataset.status === "revealed") {
    revealBombs();
    createGameEndMessage("lose");
  } else {
    showConfetti();
    createGameEndMessage("win");
  }

  // show end-game modal / overlay
  setTimeout(() => {
    document.querySelector(".two .overlay").classList.add("active");
    document.getElementById("game-end").classList.add("active");
    // Scrollbar belongs to the ".page.two" div
    // Scroll window to the top before rendering overlay
    document.querySelector(".page.two").scrollTo({ top: 0, left: 0 });
    document.querySelector(".page.two").classList.add("overflow-hidden"); // hide scrollbar whenoverlay is rendered
  }, 3000);
}

export {
  createGameArray,
  createBoard,
  timer,
  startTimer,
  toggleSmiley,
  checkWin,
  endGameAction,
};
