import { readInput } from "../utils.js";

const input = readInput("./day1/input.txt");

const parseInput = (lists) => {
  const lines = lists.trim().split("\n");

  const leftSide = [];
  const rightSide = [];

  lines.forEach((line) => {
    const [left, right] = line.trim().split(/\s+/);
    leftSide.push(Number(left));
    rightSide.push(Number(right));
  });

  return [leftSide, rightSide];
};

const [leftList, rightList] = parseInput(input);
let totalDistance = 0;

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

// Iterate thru them and calc total distance
leftList.forEach((id, index) => {
  const distance = Math.abs(id - rightList[index]);
  totalDistance += distance;
});

console.log("Total Distance: ", totalDistance);

// PART 2
let similarityScore = 0;
const map = {};
leftList.forEach((id) => {
  if (map[id] === undefined) {
    map[id] = 0;
  }
});

rightList.forEach((id) => {
  if (map[id] !== undefined) {
    map[id]++;
  }
});

for (const [id, frequency] of Object.entries(map)) {
  similarityScore += id * frequency;
}

console.log("Simirarity Score: ", similarityScore);
