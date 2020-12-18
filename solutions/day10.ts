import { find, isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  const values = input.split('\n').filter(v => !isEmpty(v)).map(v => parseInt(v, 10)).sort((a, b) => a-b);

  const device = values.slice(-1)[0] + 3;
  let j1 = 0;
  let j3 = 0;

  values.unshift(0);
  values.push(device);

  for(let index = 1; index < values.length; index++) {
    if (values[index] - values[index-1] === 1) {
      j1++;
    } else if (values[index] - values[index-1] === 3) {
      j3++;
    }
  }

  return (j1 * j3);
};

export async function solution2(input: string): Promise<number> {
  const values = input.split('\n').filter(v => !isEmpty(v)).map(v => parseInt(v, 10)).sort((a, b) => a-b);

  const device = values.slice(-1)[0] + 3;
  let j1 = 0;
  let j3 = 0;

  values.unshift(0);
  values.push(device);

  let permutations = 0;

  let cache: {[key:number]: number} = {};

  const findCombo = (offset: number): number => {
    if (offset + 1 === values.length) {
      return 0;
    }

    if (offset + 2 === values.length) {
      return 1;
    }

    let offset2 = offset + 1;

    let total = 0;

    while (offset2 + 1 < values.length && values[offset2]-values[offset] <= 3) {
      if (cache[values[offset2]] === undefined ) {
        cache[values[offset2]] = findCombo(offset2);
      }

      total += cache[values[offset2]];
      offset2++;
    }

    return total;
  };

  permutations = findCombo(0);

  return permutations;
}
