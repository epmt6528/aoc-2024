import { readInput } from "../utils.js";

const input = readInput("./day2/input.txt");

const parseInput = (lists) => {
  const lines = lists.trim().split("\n");
  return lines.map((line) => line.trim().split(/\s+/));
};

const parsedData = parseInput(input);

function isSafe(report) {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i <= report.length; i++) {
    const diff = report[i] - report[i - 1];

    // Check if differences are within the range [1, 3] or [-3, -1]
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    // Check if the sequence is strictly increasing or decreasing
    if (diff > 0) isDecreasing = false;
    if (diff < 0) isIncreasing = false;
  }

  // A report is safe if it's entirely increasing or decreasing
  return isIncreasing || isDecreasing;
}

function countSafeReports(data) {
  let safeCount = 0;

  for (const report of data) {
    if (isSafe(report)) {
      safeCount++;
    }
  }

  return safeCount;
}

console.log("The number of safe reports: ", countSafeReports(parsedData));

// Step 2
function canBeMadeSafe(report) {
  for (let i = 0; i < report.length; i++) {
    // Create a copy of the report without the current level
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));

    // Check if the modified report is safe
    if (isSafe(modifiedReport)) {
      return true;
    }
  }

  return false;
}

function countSafeReports2(data) {
  let safeCount = 0;

  for (const report of data) {
    if (isSafe(report) || canBeMadeSafe(report)) {
      safeCount++;
    }
  }

  return safeCount;
}

console.log(
  "The number of safe reports(Part 2): ",
  countSafeReports2(parsedData)
);
