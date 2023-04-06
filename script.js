let i = 0;
const game_title = "MINESWEEPER";
const play_btn = document.getElementById("btn-play");
const game_params = document.getElementById("game-params");
const close_game_params_btn = document.getElementById("btn-close-game-params");
const how_to_btn = document.getElementById("btn-how-to");
const how_to_play = document.getElementById("how-to-play");
const close_how_to_btn = document.getElementById("btn-close-how-to");
const play_now_btn = document.getElementById("btn-play-now");
const pages = document.querySelectorAll(".page");
const translateAmount = 100;
let translate = 0;

// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };

function typing() {
  if (i < game_title.length) {
    document.getElementById("game-title").innerHTML += game_title.charAt(i);
    i++;
    setTimeout(typing, 150);
  }
}

typing();

const slide = (direction) => {
  console.log("I'm executed!");
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
  game_params.classList.remove("active");
  slide("next");
});
