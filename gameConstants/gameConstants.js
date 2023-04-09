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

/**
 * Dictates all colors applied to tiles based on their innerHTML value.
 */
const fontColorProperty = {
  0: {
    backgroundColor: "rgb(255, 255, 255)",
    fontColor: "rgb(255, 255, 255)",
    outsetColor: "rgb(195, 216, 234)",
  },
  1: {
    backgroundColor: "rgb(0, 193, 231)",
    fontColor: "rgb(116, 214, 231)",
    outsetColor: "rgb(0, 135, 208)",
  },
  2: {
    backgroundColor: "rgb(251, 214, 75)",
    fontColor: "rgb(254, 254, 108)",
    outsetColor: "rgb(239, 145, 77)",
  },
  3: {
    backgroundColor: "rgb(249, 111, 171)",
    fontColor: "rgb(234, 177, 207)",
    outsetColor: "rgb(230, 9, 108)",
  },
  4: {
    backgroundColor: "#64748b",
    fontColor: "#e2e8f0",
    outsetColor: "#334155",
  },
  5: {
    backgroundColor: "#84cc16",
    fontColor: "#bef264",
    outsetColor: "#4d7c0f",
  },
  6: {
    backgroundColor: "#7c3aed",
    fontColor: "#a78bfa",
    outsetColor: "#6b21a8",
  },
  7: {
    backgroundColor: "#f43f5e",
    fontColor: "#ffe4e6",
    outsetColor: "#e11d48",
  },
};

export { gameDifficulty, fontColorProperty };
