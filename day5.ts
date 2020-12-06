import { isEmpty, negate } from "lodash";

export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n');

  let max = 0;

  for (const line of lines.filter(negate(isEmpty))) {
    const v = parseInt(line.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2);

    if (v > max) {
      max = v;
    }
  }

  return max;
};

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n');

  const seats: number[] = [];

  for (const line of lines.filter(negate(isEmpty))) {
    const v = parseInt(line.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2);

    seats.push(v);
  }

  const sorted = seats.sort()

  for (let x = 0; x < Math.pow(2, 10); x++) {
    if (! sorted.includes(x) && sorted.includes(x-1) && sorted.includes(x+1)) {
      return x;
    }
  }

  return -1;
}

