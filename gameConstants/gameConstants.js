/**
 * Game difficulty level and their corresponding value
 */
const gameDifficulty = Object.freeze({
  easy: {
    rowNum: 10,
    colNum: 10,
    bombCount: 15,
    timeAllowedInSecond: 180,
  },
  medium: {
    rowNum: 16,
    colNum: 16,
    bombCount: 40,
    timeAllowedInSecond: 180,
  },
  hard: {
    rowNum: 20,
    colNum: 20,
    bombCount: 70,
    timeAllowedInSecond: 180,
  },
  adventurous: {
    rowNum: 20,
    colNum: 40,
    bombCount: 120,
    timeAllowedInSecond: 180,
  },
});

export { gameDifficulty };
