import { minesweeperGame } from "../script.js";
import { flag } from "../gameConstants/gameConstants.js";
import { updateTileStyles } from "./gameLeftClickUtils.js";

function tileRightClick(e) {
  e.preventDefault();

  let tile = e.target;

  if (
    tile.tagName === "DIV" &&
    (tile.dataset.status === "hidden" || tile.dataset.status === "questioned")
  ) {
    tile.dataset.status = "flagged";
    tile.innerHTML = flag;
    updateTileStyles(tile);
    document.getElementById("tile-flagged").play();
    //"<img src='../images/triangular-flag.svg' class='flag'></img>";
    minesweeperGame.setBombNum();
  }
}

export { tileRightClick };
