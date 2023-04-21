import { createBoard, timer, startTimer } from "../utils/gameBoardUtils.js";
import { gameDifficulty } from "../gameConstants/gameConstants.js";

export class MinesweeperGame {
  constructor(
    player,
    difficultyLevel,
    rowNum,
    colNum,
    bombNum,
    hasTimer,
    timeAllowedInSeconds
  ) {
    this.player = player;
    this.difficultyLevel = difficultyLevel;
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.gameBombNum = bombNum;
    this.bombNum = bombNum;
    this.hasTimer = hasTimer;
    this.timeInSeconds = hasTimer
      ? gameDifficulty[difficultyLevel].timeAllowedInSecond
      : 0;
    this.gameStatus = "started";
    this.gameArray = createBoard(this.rowNum, this.colNum, this.gameBombNum);

    // Initiate timer
    timer(this.timeInSeconds);
    startTimer(this.hasTimer, this.timeInSeconds, this.gameStatus);
  }

  // minus bomb
  minusBombNum() {
    this.bombNum -= 1;
    document.getElementById("bombCount").innerHTML = String(
      this.bombNum
    ).padStart(4, "0");
  }

  // add bomb
  addBombNum() {
    this.bombNum += 1;
    document.getElementById("bombCount").innerHTML = String(
      this.bombNum
    ).padStart(4, "0");
  }
}

export class Tile {
  constructor(x, y, hasBomb) {
    let boardTile = document.createElement("div");
    boardTile.dataset.x = x;
    boardTile.dataset.y = y;
    boardTile.dataset.status = "hidden";
    boardTile.classList.add("tile");
    if (hasBomb) {
      boardTile.classList.add("bomb");
    }
    this.boardTile = boardTile;
  }
}
