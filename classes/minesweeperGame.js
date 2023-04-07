import { createGameArray, createBoard } from "../utils/utilities.js";

export class MinesweeperGame {
  constructor(
    player,
    difficultyLevel,
    rowNum,
    colNum,
    bombNum,
    hasTimer,
    timeInSeconds
  ) {
    this.player = player;
    this.difficultyLevel = difficultyLevel;
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.bombNum = bombNum;
    this.hasTimer = hasTimer;
    this.timeInSeconds = timeInSeconds;
    this.gameStatus = "started";
    this.gameArray = createBoard(rowNum, colNum, bombNum);
  }
  // create game board
  createBoard(rowNum, colNum, bombNum) {}

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
