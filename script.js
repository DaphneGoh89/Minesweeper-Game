import { MinesweeperGame, Tile } from "./classes/minesweeperGame.js";
import { fontColorProperty } from "./gameConstants/gameConstants.js";
import { closeGameWin } from "./utils/gameWindowUtils.js";
import { toggleSmiley } from "./utils/gameBoardUtils.js";
import {
  tileClick,
  getAdjacentTiles,
  countBomb,
  updateTileStyles,
} from "./utils/gameLeftClickUtils.js";
import { tileRightClick } from "./utils/gameRightClickUtils.js";
//************************************ VARIABLES AND DOM ELEMENTS ****************************************//

const play_btn = document.getElementById("btn-play");
const close_game_params_btn = document.getElementById("btn-close-game-params");
const how_to_btn = document.getElementById("btn-how-to");
const close_how_to_btn = document.getElementById("btn-close-how-to");
const play_now_btn = document.getElementById("btn-play-now");
const close_game_win_btn = document.getElementById("btn-close-game-win");
const play_again_btn = document.getElementById("btn-play-again");
const test_show_modal_btn = document.getElementById("test-show-modal");

const overlay = document.getElementById("overlay");
const game_params = document.getElementById("game-params");
const how_to_play = document.getElementById("how-to-play");
const game_win = document.getElementById("game-win");

const board = document.getElementById("board");
const tile_board = document.getElementById("tile-board");
const pages = document.querySelectorAll(".page");

const game_title = "MINESWEEPER";
const translateAmount = 100;
let i = 0;
let translate = 0;
let minesweeperGame;

//*************************************** FUNCTIONS DECLARATION **********************************************//
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

//**************************************** EVENT LISTENERS ****************************************//
// 1. Play Now button (Home page)
play_btn.addEventListener("click", () => {
  game_params.classList.add("active");
});

// 2. Close game parameters window
close_game_params_btn.addEventListener("click", () => {
  game_params.classList.remove("active");
});

// 3. How To Play button
how_to_btn.addEventListener("click", () => {
  how_to_play.classList.add("active");
});

// 4. Close How To Play window
close_how_to_btn.addEventListener("click", () => {
  how_to_play.classList.remove("active");
});

// 5. Play Now button (Game parameter window)
play_now_btn.addEventListener("click", () => {
  const gameDifficulty = document.querySelector(
    "input[name='gameDifficulty']:checked"
  ).dataset.gameDifficulty;

  game_params.classList.remove("active");
  slide("next");
  minesweeperGame = new MinesweeperGame(
    "guest",
    gameDifficulty,
    4,
    6,
    10,
    true
  );
  console.log("instantiate new game", minesweeperGame);
});

// TO REMOVE
test_show_modal_btn.addEventListener("click", () => {
  game_win.classList.add("active");
});

// 6. Close 'Game-win' window
close_game_win_btn.addEventListener("click", () => closeGameWin());

// 7. Reset game board with new game
play_again_btn.addEventListener("click", () => {
  // clear board
  toggleSmiley();
  tile_board.innerHTML = "";
  closeGameWin();
  minesweeperGame = new MinesweeperGame("guest", "hard", 4, 6, 10, true);
});

// 8. Listen to tile left click on game board
board.addEventListener("click", (e) => tileClick(e.target));

// 9. Listen to tile right click on game board
board.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  tileRightClick(e.target);
});

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
(6) Create start new game function - reset timer, reset board, reset smiley face, reset bombcount
(7) Create lose action function - stop timer + confetti + disable click + setTimeout (show overlay + win modal)
*/
