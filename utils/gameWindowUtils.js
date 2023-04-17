const overlay = document.getElementById("overlay");
const game_win = document.getElementById("game-win");

function closeGameWin() {
  game_win.classList.remove("active");
  overlay.classList.remove("active");
}

export { closeGameWin };
