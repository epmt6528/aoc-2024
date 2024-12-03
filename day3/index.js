// xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
// produces 161 (2*4 + 5*5 + 11*8 + 8*5)

import { readInput } from "../utils.js";

const input = readInput("./day3/input.txt");
const parseInput = (input) => {
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = input.match(mulRegex) || [];
  return matches;
};

const calcTotal = (mulList) => {
  return mulList.reduce((sum, mul) => {
    const [x, y] = mul.match(/\d+/g).map(Number);
    return sum + x * y;
  }, 0);
};

console.log("Total: ", calcTotal(parseInput(input)));

// Part 2
const parseInput2 = (input) => {
  const pattern = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
  const matches = input.match(pattern) || [];
  return matches;
};

let isEnabled = true;
let sum = 0;
for (const item of parseInput2(input)) {
  if (item === "don't()") {
    isEnabled = false;
    continue;
  }
  if (item === "do()") {
    isEnabled = true;
    continue;
  }

  if (isEnabled) {
    const [x, y] = item.match(/\d+/g).map(Number);
    sum += x * y;
  }
}

console.log("Total(Part 2): ", sum);
