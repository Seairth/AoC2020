import { isUndefined } from "lodash";

export async function solution1(input: string): Promise<number> {
  return solve(input, 2020);
}

export async function solution2(input: string): Promise<number> {
  return solve(input, 30000000);
}

function solve(input: string, spokenIndex: number): number {
  const spoken = input.split(',').map(v => parseInt(v, 10));
  const spokenMap = new Array<number>(spokenIndex);

  let lastSpoken = spoken.pop()!;

  spoken.forEach((v, i) => {
    spokenMap[v] = i;
  });

  for (let i = spoken.length; i < spokenIndex - 1; i++) {
    const index = spokenMap[lastSpoken];
    spokenMap[lastSpoken] = i;

    lastSpoken = isUndefined(index) ? 0 : (i - index);
  }

  return lastSpoken;
}
