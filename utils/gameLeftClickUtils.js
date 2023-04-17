import { fontColorProperty } from "../gameConstants/gameConstants.js";
import { minesweeperGame } from "../script.js";
import { toggleSmiley, checkWin, winAction } from "./gameBoardUtils.js";

/******************************************************************
 * Event Propagation:
 * Right-click event:
 * (1) Check if tile is "hidden"
 * (2) Reveal tile content. If contains -
 * (a) "bomb" -> end game
 * (b) 0 -> repeat tileClick()
 * (c) display bombCount
 *****************************************************************/

function tileClick(tile) {
  if (tile.dataset.status !== "hidden") {
    return;
  } else if (tile.classList.contains("bomb")) {
    tile.dataset.status = "revealed";
    tile.innerHTML = "<img src='../images/bomb_icon.svg'></img>";
    tile.style.backgroundColor = "red";
    revealBombs();
    winAction();
    return;
  }
  tile.dataset.status = "revealed";

  let adjacentTiles = getAdjacentTiles(
    tile,
    minesweeperGame.rowNum,
    minesweeperGame.colNum
  );

  let surroundingBombs = countBomb(adjacentTiles);
  tile.innerHTML = surroundingBombs;

  updateTileStyles(tile);
  toggleSmiley(tile);
  document.getElementById("tile-click").play(); // document.getElementById("tile-click").duration
  checkWin();

  // Repeat tileClick() if surroundingBombs = 0
  if (surroundingBombs == 0) {
    for (let tile of adjacentTiles) {
      setTimeout(() => tileClick(tile), 216);
    }
  }

  // Remove bubble effect
  setTimeout(() => tile.classList.remove("animate-bubble"), 800);
}

/******************************************************************
 * Function: Takes in a <div> as a parameter, and return the surrounding div's coordinates.
 * @param {*} div x- / y- coordinates should be set in the data attributes of the div.
 * @param {*} rowNum To prevent the function from including an out of range div.
 * @param {*} colNum To prevent the function from including an out of range div.
 * @returns An array containing all divs adjacent to the div parameter.
 *****************************************************************/
function getAdjacentTiles(div, rowNum, colNum) {
  let x = div.dataset.x;
  let y = div.dataset.y;
  const adjacentCells = [];
  // this will loop through all the neighbouring cell of the targeted coordinates
  for (let XOffset = -1; XOffset <= 1; XOffset++) {
    for (let YOffset = -1; YOffset <= 1; YOffset++) {
      let xCoordinate = parseInt(x) + XOffset;
      let yCoordinate = parseInt(y) + YOffset;
      // both x- and y-coordinate cannot be negative value and cannot go beyond row/ column length
      if (
        xCoordinate >= 0 &&
        yCoordinate >= 0 &&
        xCoordinate < rowNum &&
        yCoordinate < colNum
      ) {
        // select neigbouring divs
        const adjacentDiv = document.querySelector(
          `[data-x="${xCoordinate}"][data-y="${yCoordinate}"]`
        );
        adjacentCells.push(adjacentDiv);
      }
    }
  }
  return adjacentCells;
}

/******************************************************************
 * Function: Count number of bombs in an array of divs.
 * @param {*} divArray array of divs
 *****************************************************************/
function countBomb(divArray) {
  let bombCount = 0;

  for (let div of divArray) {
    if (div.classList.contains("bomb")) {
      bombCount++;
    }
  }
  return bombCount;
}

/******************************************************************
 * Function: Update tile's style based on the following rules -
 * (i) add 'tile-revealed' class to tile
 * (ii) classList contains 'bomb' - show 'bomb' image
 * (iii) Else, show surrounding bombs count
 * @param {*} div
 ******************************************************************/
function updateTileStyles(div) {
  // (ii)
  if (div.classList.contains("bomb")) {
    div.innerHTML = "<img src='../images/bomb_icon.svg'></img>";
    div.style.backgroundColor = "red";
    //revealBombs();

    setTimeout(() => {
      let bombArray = document.querySelectorAll(".bomb");

      for (let div of bombArray) {
        div.classList.remove("bomb");
      }
    }, 3000);
  } else {
    // (i)
    div.classList.add("tile-revealed");
    div.classList.add("animate-bubble");
    // (iii)
    let count = div.innerHTML;
    div.style.backgroundColor = fontColorProperty[count].backgroundColor;
    div.style.color = fontColorProperty[count].fontColor;
    div.style.boxShadow = `0 4px 0 ${fontColorProperty[count].outsetColor}`;
  }
}

/******************************************************************
 * Function: Reveal all bombs when called.
 *****************************************************************/
let bombShowInterval;
function revealBombs() {
  let bombArray = document.querySelectorAll(".bomb");
  let i = 0;

  bombShowInterval = setInterval(() => {
    console.log("setInterval - still running?");
    if (i < bombArray.length) {
      bombArray[i].dataset.status = "revealed";
      bombArray[i].innerHTML = "<img src='../images/bomb_icon.svg'></img>";
      i++;
    } else {
      clearInterval(bombShowInterval);
    }
  }, 50);
}

export { tileClick, getAdjacentTiles, countBomb, updateTileStyles };
