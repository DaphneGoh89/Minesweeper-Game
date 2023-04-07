import { MinesweeperGame } from "./classes/minesweeperGame.js";

//*********************** VARIABLES AND DOM ELEMENTS *****************************//
let i = 0;
const game_title = "MINESWEEPER";
const play_btn = document.getElementById("btn-play");
const game_params = document.getElementById("game-params");
const close_game_params_btn = document.getElementById("btn-close-game-params");
const how_to_btn = document.getElementById("btn-how-to");
const how_to_play = document.getElementById("how-to-play");
const close_how_to_btn = document.getElementById("btn-close-how-to");
const play_now_btn = document.getElementById("btn-play-now");
const board = document.getElementById("board");
const pages = document.querySelectorAll(".page");
const translateAmount = 100;
let translate = 0;

//*********************** FUNCTIONS DECLARATION *****************************//
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

//*********************** EVENT LISTENERS *****************************//
play_btn.addEventListener("click", () => {
  game_params.classList.add("active");
});

close_game_params_btn.addEventListener("click", () => {
  game_params.classList.remove("active");
});

how_to_btn.addEventListener("click", () => {
  how_to_play.classList.add("active");
});

close_how_to_btn.addEventListener("click", () => {
  how_to_play.classList.remove("active");
});

play_now_btn.addEventListener("click", () => {
  // 1. Close game parameter modal
  game_params.classList.remove("active");
  // 2. Slide to game board page
  slide("next");
  // 3. Instantiate new game
  const minesweeperGame = new MinesweeperGame(
    "guest",
    "adventurous",
    4,
    6,
    10,
    false,
    0
  );
  console.log("instantiate new game", minesweeperGame);
});

/**
 * Event Propagation:
 */

board.addEventListener("click", (e) => {
  let selectedTile = e.target;

  if (selectedTile.dataset?.status === "hidden") {
    selectedTile.classList.add("tile-revealed");
    selectedTile.classList.add("animate-bubble");
    setTimeout(() => selectedTile.classList.remove("animate-bubble"), 600);
  }
});

/* 
TODO -
(1) Game parameter input
(2) "reveal" and "hidden" CSS class
(3) Event listener on tile - add revealed class to tile

*/
