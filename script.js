import { MinesweeperGame } from "./classes/minesweeperGame.js";
import { gameDifficulty } from "./gameConstants/gameConstants.js";
import { closeGameEnd } from "./utils/gameWindowUtils.js";
import { toggleSmiley } from "./utils/gameBoardUtils.js";
import { tileClick } from "./utils/gameLeftClickUtils.js";
import { tileRightClick } from "./utils/gameRightClickUtils.js";

/************************************ VARIABLES AND DOM ELEMENTS ****************************************/

const play_btn = document.getElementById("btn-play");
const close_game_params_btn = document.getElementById("btn-close-game-params");
const how_to_btn = document.getElementById("btn-how-to");
const close_how_to_btn = document.getElementById("btn-close-how-to");
const play_now_btn = document.getElementById("btn-play-now");
const close_game_end_btn = document.getElementById("btn-close-game-end");
const play_again_btn = document.getElementById("btn-play-again");

const overlay = document.querySelector(".overlay"); //document.getElementById("overlay");
const game_params = document.getElementById("game-params");
const how_to_play = document.getElementById("how-to-play");
const game_difficulty = document.querySelectorAll(".game-difficulty label");
const custom_game_param = document.getElementById("custom-game-param");
const game_end = document.getElementById("game-end");

const board = document.getElementById("board");
const smiley_img = document.getElementById("smiley-img");
const tile_board = document.getElementById("tile-board");
const pages = document.querySelectorAll(".page");

const game_title = "MINESWEEPER";
const translateAmount = 100;
let i = 0;
let translate = 0;
let minesweeperGame;

/*************************************** FUNCTIONS DECLARATION **********************************************/
const typing = () => {
  if (i < game_title.length) {
    document.getElementById("game-title").innerHTML += game_title.charAt(i);
    i++;
    setTimeout(typing, 150);
  }
};

typing();

const slide = (direction) => {
  direction === "next"
    ? (translate -= translateAmount)
    : (translate += translateAmount);

  pages.forEach((page) => (page.style.transform = `translateX(${translate}%)`));
};

/**************************************** EVENT LISTENERS ****************************************/
// 1. Play Now button (Home page)
play_btn.addEventListener("click", () => {
  overlay.classList.add("active");
  game_params.classList.add("active");
});

// 2. Close game parameters window
close_game_params_btn.addEventListener("click", () => {
  overlay.classList.remove("active");
  game_params.classList.remove("active");
});

// 3. Custom game -> display custom input div on radio selection
game_difficulty.forEach((label) => {
  label.addEventListener("click", () => {
    if (label.htmlFor === "custom") {
      custom_game_param.classList.add("active");
    } else {
      custom_game_param.classList.remove("active");
    }
  });
});

// 4. How To Play button
how_to_btn.addEventListener("click", () => {
  overlay.classList.add("active");
  how_to_play.classList.add("active");
});

// 5. Close How To Play window
close_how_to_btn.addEventListener("click", () => {
  overlay.classList.remove("active");
  how_to_play.classList.remove("active");
});

// 6. Play Now button (Game parameter window)
play_now_btn.addEventListener("click", () => {
  overlay.classList.remove("active");
  game_params.classList.remove("active");
  slide("next");
  startGame();
});

// TO REMOVE
// test_show_modal_btn.addEventListener("click", () => {
//   game_end.classList.add("active");
// });

// 7. Close 'Game-end' window
close_game_end_btn.addEventListener("click", () => closeGameEnd());

// 8. Reset game board with new game
play_again_btn.addEventListener("click", () => startNewGame());

// 9. Listen to tile left click on game board
board.addEventListener("click", (e) => tileClick(e.target));

// 10. Listen to tile right click on game board
board.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  tileRightClick(e.target);
});

// 11. Start new game
smiley_img.addEventListener("click", () => startNewGame());

/*****************************************************************************
 * Start game
 *****************************************************************************/
function startGame() {
  // Read game difficulty selected by player
  let difficultyLevel = document.querySelector(
    "input[name='gameDifficulty']:checked"
  ).dataset.gameDifficulty;

  // GET CUSTOM ROW / COLUMN / BOMB NUMBER From Game Constants
  let rowNum =
    difficultyLevel === "custom"
      ? parseInt(document.getElementById("rowNum").value)
      : gameDifficulty[difficultyLevel].rowNum;
  let colNum =
    difficultyLevel === "custom"
      ? parseInt(document.getElementById("colNum").value)
      : gameDifficulty[difficultyLevel].colNum;
  let bombNum =
    difficultyLevel === "custom"
      ? parseInt(document.getElementById("bombNum").value)
      : gameDifficulty[difficultyLevel].bombCount;

  // Set local storage - For Starting New Game
  window.localStorage.setItem("minesweeper.difficultyLevel", difficultyLevel);
  window.localStorage.setItem("minesweeper.rowNum", rowNum);
  window.localStorage.setItem("minesweeper.colNum", colNum);
  window.localStorage.setItem("minesweeper.bombNum", bombNum);

  // Call MinesweeperGame Constructor To Start New Game
  minesweeperGame = new MinesweeperGame(
    "guest",
    difficultyLevel,
    rowNum,
    colNum,
    bombNum,
    false
  );

  // TO REMOVE
  console.log("instantiate new game", minesweeperGame);
}

/*****************************************************************************
 * Start new game
 *****************************************************************************/
function startNewGame() {
  // To restore scrollbar that was removed when overlay was displayed on game-end
  document.querySelector(".page.two").classList.remove("overflow-hidden");

  // Clear and restore board
  toggleSmiley();
  tile_board.innerHTML = "";

  // Close game end modal and overlay
  closeGameEnd();

  // Get game parameters from local storage
  let difficultyLevel = window.localStorage.getItem(
    "minesweeper.difficultyLevel"
  );
  let rowNum = window.localStorage.getItem("minesweeper.rowNum");
  let colNum = window.localStorage.getItem("minesweeper.colNum");
  let bombNum = window.localStorage.getItem("minesweeper.bombNum");

  //  Start new game
  minesweeperGame = new MinesweeperGame(
    "guest",
    difficultyLevel,
    rowNum,
    colNum,
    bombNum,
    false
  );
}

//**************************************** EXPORTS ****************************************//
export { minesweeperGame };

//**************************************** TO DO ****************************************//
/* 
TODO -
(1) Game parameter input
(2) "reveal" and "hidden" CSS class
(3) Event listener on tile - end game when click on tile containing bomb
(4) To create two game modals - 1. Game over  2. You win 
(5) Create endgame function on - time's up / click on bomb -> show endgame modal
(7) Create lose action function - stop timer + confetti + disable click + setTimeout (show overlay + win modal)
(8) Reveal bomb function - to reveal bomb with random colors
*/
