import { dir } from "console";
import { countBy } from "lodash";
import { registerSolutionFunc } from "./solutionManager";

async function solution1(input: string): Promise<number> {
  return calcTrees(input, 3, 1);
};

async function solution2(input: string): Promise<number> {
  const permutations = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ];

  let product = 1;

  for(let p of permutations) {
    product = product * calcTrees(input, p[0], p[1]);
  }

  return product;
}

function calcTrees(input: string, deltaX: number, deltaY: number): number {
  const lines = input.split('\n');
  let x = 0;
  let y = 0;

  let trees = 0;

  do {
    if (lines[y].charAt(x) === '#') {
      trees++;
    }

    x = (x + deltaX) % lines[y].length;
    y = y + deltaY;
  } while (y < lines.length);

  return trees;
}

registerSolutionFunc(3, 1, solution1);
registerSolutionFunc(3, 2, solution2);