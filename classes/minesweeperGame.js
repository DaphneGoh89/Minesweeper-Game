import { createGameArray, createBoard } from "../utils/utilities.js";
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
    this.timeInSeconds = timeAllowedInSeconds;
    this.gameStatus = "started";
    this.gameArray = createBoard(this.rowNum, this.colNum, this.bombNum);
  }

  // start timer

  // check win

  // check lose

  // reveal tile

  // flag tile
}

export class Tile {
  constructor(x, y, hasBomb) {
    let boardTile = document.createElement("div");
    boardTile.dataset.x = x;
    boardTile.dataset.y = y;
    boardTile.dataset.status = "hidden";
    boardTile.classList.add("tile");
    this.boardTile = boardTile;
    this.x = x;
    this.y = y;
    this.hasBomb = hasBomb;
    this.status = "hidden";
  }

  // reveal tile

  // flag tile

  // mark question
}
