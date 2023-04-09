import {
  createGameArray,
  createBoard,
  timer,
  startTimer,
} from "../utils/gameBoardUtils.js";
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
    this.rowNum = gameDifficulty[difficultyLevel].rowNum;
    this.colNum = gameDifficulty[difficultyLevel].colNum;
    this.bombNum = gameDifficulty[difficultyLevel].bombCount;
    this.hasTimer = hasTimer;
    this.timeInSeconds = hasTimer
      ? gameDifficulty[difficultyLevel].timeAllowedInSecond
      : 0;
    this.gameStatus = "started";
    this.gameArray = createBoard(this.rowNum, this.colNum, this.bombNum);

    // Initiate timer
    timer(this.timeInSeconds);
    this.timerId = startTimer(
      this.hasTimer,
      this.timeInSeconds,
      this.gameStatus
    );

    console.log("myTimer", this.timerId);
  }

  // check win

  // check lose

  // reveal tile

  // flag tile

  // minus bomb
  setBombNum() {
    this.bombNum -= 1;
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
    this.tileClick = function () {
      console.log("I'm clicked!");
    };
  }

  // flag tile

  // mark question
}
