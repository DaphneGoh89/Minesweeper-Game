import { MinesweeperGame, Tile } from "./classes/minesweeperGame.js";
import { fontColorProperty } from "./gameConstants/gameConstants.js";
import {
  tileClick,
  getAdjacentTiles,
  countBomb,
  updateTileStyles,
} from "./utils/gameLeftClickUtils.js";

//************************************ VARIABLES AND DOM ELEMENTS ****************************************//

const play_btn = document.getElementById("btn-play");
const close_game_params_btn = document.getElementById("btn-close-game-params");
const how_to_btn = document.getElementById("btn-how-to");
const close_how_to_btn = document.getElementById("btn-close-how-to");
const play_now_btn = document.getElementById("btn-play-now");

const game_params = document.getElementById("game-params");
const how_to_play = document.getElementById("how-to-play");

const board = document.getElementById("board");
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
  // 1. Close game parameter modal
  game_params.classList.remove("active");
  // 2. Slide to game board page
  slide("next");
  // 3. Instantiate new game

  minesweeperGame = new MinesweeperGame("guest", "adventurous", 4, 6, 10, true);
  console.log("instantiate new game", minesweeperGame);
});

board.addEventListener("click", (e) => tileClick(e.target));
board.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  console.log("context menu", e.target);
  let tile = e.target;
  if (
    tile.tagName === "DIV" &&
    (tile.dataset.status === "hidden" || tile.dataset.status === "questioned")
  ) {
    tile.dataset.status = "flagged";
    tile.innerHTML =
      "<img src='../images/triangular-flag.svg' class='flag'></img>";
    minesweeperGame.setBombNum();
  }
});

//**************************************** EXPORTS ****************************************//
export { minesweeperGame };

//**************************************** TO DO ****************************************//
/* 
TODO -
(1) Game parameter input
(2) "reveal" and "hidden" CSS class
(3) Event listener on tile - end game when click on tile containing bomb
(4) Flag animation css
(5) Tile status: hidden > revealed > flagged 
*/
