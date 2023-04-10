import { minesweeperGame } from "../script.js";
import { flag } from "../gameConstants/gameConstants.js";
import { updateTileStyles } from "./gameLeftClickUtils.js";

/****************************************************
 * Function: Insert/ remove flag on right click.
 * @param {*} tile
 ****************************************************/
function tileRightClick(tile) {
  // (i) Insert flag into empty div on right-click
  if (
    tile.tagName === "DIV" &&
    (tile.dataset.status === "hidden" || tile.dataset.status === "questioned")
  ) {
    tile.dataset.status = "flagged";
    tile.classList.add("tile-flagged");
    tile.innerHTML = flag;
    // updateTileStyles(tile);
    document.getElementById("tile-flagged").play(); // Play flag's audio
    minesweeperGame.setBombNum();
  }

  // (ii) Remove flag from div that ahs already been flagged
  else if (tile.tagName === "DIV" && tile.dataset.status === "flagged") {
    tile.dataset.status = "hidden";
    tile.classList.remove("tile-flagged");
    tile.innerHTML = "";
  }
  // (iii) Recursively call rightClick function with svg/ path's ancestor
  else if (tile.tagName === "svg" || tile.tagName === "path") {
    tileRightClick(tile.closest(".tile"));
  }
}

export { tileRightClick };
