import { readInput } from "../utils.js";

const input = readInput("./day4/input.txt");
const parseInput = (lists) => {
  const lines = lists.trim().split("\n");
  return lines.map((line) => line.trim().split(""));
};

const parsedData = parseInput(input);

const part1 = () => {
  let count = 0;
  const rows = parsedData.length;
  const cols = parsedData[0].length;

  const KEY_WORD = ["X", "M", "A", "S"];

  // direction = "UL" | "U" | "UR" | "L" | "R" | "DL" | "D" | "DR"
  const dfs = (row, col, char, direction) => {
    const isInvalidRow = row < 0 || rows <= row;
    const isInvalidCol = col < 0 || cols <= col;
    if (
      isInvalidRow ||
      isInvalidCol ||
      char === undefined ||
      parsedData[row][col] !== char
    ) {
      return;
    }

    if (parsedData[row][col] === "S") {
      count++;
      return;
    }

    const nextChar = KEY_WORD[KEY_WORD.indexOf(char) + 1];

    switch (direction) {
      case "UL": // Upper Left
        dfs(row - 1, col - 1, nextChar, "UL");
        break;
      case "U": // Upper
        dfs(row - 1, col, nextChar, "U");
        break;
      case "UR": // Upper Right
        dfs(row - 1, col + 1, nextChar, "UR");
        break;
      case "L": // Left
        dfs(row, col - 1, nextChar, "L");
        break;
      case "R": // Right
        dfs(row, col + 1, nextChar, "R");
        break;
      case "DL": // Down Left
        dfs(row + 1, col - 1, nextChar, "DL");
        break;
      case "D": // Down
        dfs(row + 1, col, nextChar, "D");
        break;
      case "DR": // Down Right
        dfs(row + 1, col + 1, nextChar, "DR");
        break;
      default:
        dfs(row - 1, col - 1, nextChar, "UL");
        dfs(row - 1, col, nextChar, "U");
        dfs(row - 1, col + 1, nextChar, "UR");
        dfs(row, col - 1, nextChar, "L");
        dfs(row, col + 1, nextChar, "R");
        dfs(row + 1, col - 1, nextChar, "DL");
        dfs(row + 1, col, nextChar, "D");
        dfs(row + 1, col + 1, nextChar, "DR");
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dfs(i, j, "X");
    }
  }

  console.log("Count(Part 1): ", count);
};
part1();

const part2 = () => {
  let count = 0;
  const rows = parsedData.length;
  const cols = parsedData[0].length;

  let KEY_CHARS = ["A", "M", "S"];

  const checkUlDr = (row, col, char, direction) => {
    const isInvalidRow = row < 0 || rows <= row;
    const isInvalidCol = col < 0 || cols <= col;

    if (char === undefined) {
      return true;
    }

    if (isInvalidRow || isInvalidCol || parsedData[row][col] !== char) {
      return false;
    }

    const nextChar = KEY_CHARS[KEY_CHARS.indexOf(char) + 1];

    switch (direction) {
      case "UL":
        return checkUlDr(row + 2, col + 2, nextChar, "DR");
      case "DR":
        return checkUlDr(row - 2, col - 2, nextChar, "UL");
      default:
        return (
          checkUlDr(row - 1, col - 1, nextChar, "UL") ||
          checkUlDr(row + 1, col + 1, nextChar, "DR")
        );
    }
  };

  const checkUrDl = (row, col, char, direction) => {
    const isInvalidRow = row < 0 || rows <= row;
    const isInvalidCol = col < 0 || cols <= col;

    if (char === undefined) {
      count++;
      return;
    }

    if (isInvalidRow || isInvalidCol || parsedData[row][col] !== char) {
      return;
    }

    const nextChar = KEY_CHARS[KEY_CHARS.indexOf(char) + 1];

    switch (direction) {
      case "UR":
        checkUrDl(row + 2, col - 2, nextChar, "DL");
        break;
      case "DL":
        checkUrDl(row - 2, col + 2, nextChar, "UR");
        break;

      default:
        checkUrDl(row - 1, col + 1, nextChar, "UR");
        checkUrDl(row + 1, col - 1, nextChar, "DL");
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (checkUlDr(i, j, "A")) {
        checkUrDl(i, j, "A");
      }
    }
  }

  console.log("Count(Part 2): ", count);
};
part2();
