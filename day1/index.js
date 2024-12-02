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

// Sort each list by quick sort
const quickSort = (array) => {
  if (array.length < 2) {
    return array;
  }

  const pivot = array[array.length - 1];

  const left = array.filter((el) => el < pivot);
  const right = array.filter((el) => el > pivot);
  const middle = array.filter((el) => el === pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
};
const sortedLeftList = quickSort(leftList);
const sortedRightList = quickSort(rightList);

// Iterate thru them and calc total distance
sortedLeftList.forEach((id, index) => {
  const distance = Math.abs(id - sortedRightList[index]);
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
