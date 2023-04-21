const overlay = document.querySelector(".two .overlay");
const game_end = document.getElementById("game-end");

function closeGameEnd() {
  game_end.classList.remove("active");
  overlay.classList.remove("active");
}

export { closeGameEnd };
