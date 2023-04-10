const flag =
  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e6096c">\
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>\
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>\
<g id="SVGRepo_iconCarrier"> \
  <path d="M8 21L8 16M8 16V3.57709C8 3.10699 8.5161 2.81949 8.91581 3.06693L17.7061 8.50854C18.0775 8.73848 18.0866 9.2756 17.7231 9.51793L8 16Z" width="70%" height="70%" stroke="rgba(253, 0, 143)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>\
</svg>';

/**
 * Game difficulty level and their corresponding value
 */
const gameDifficulty = Object.freeze({
  easy: {
    rowNum: 10,
    colNum: 10,
    bombCount: 15,
    timeAllowedInSecond: 60,
  },
  medium: {
    rowNum: 16,
    colNum: 16,
    bombCount: 40,
    timeAllowedInSecond: 300,
  },
  hard: {
    rowNum: 20,
    colNum: 20,
    bombCount: 70,
    timeAllowedInSecond: 480,
  },
  adventurous: {
    rowNum: 20,
    colNum: 40,
    bombCount: 120,
    timeAllowedInSecond: 600,
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

export { flag, gameDifficulty, fontColorProperty };
