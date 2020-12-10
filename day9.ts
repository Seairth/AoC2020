import { isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  return solve(input)[0];
};

export async function solution2(input: string): Promise<number> {
    return solve(input)[1];
}

function solve(input: string): [number, number] {
  const values = input.split('\n').filter(v => !isEmpty(v)).map(v => parseInt(v, 10));
  
  let badSum = 0;

  // Solution 1
  for (let index = 25; index < values.length; index++ ) {
    badSum = values[index];

    let match = false;

    for (let index2 = index - 1; index2 >= index - 24; index2--) {
      for (let index3 = index2 - 1; index3 >= index - 25; index3--) {
        if (values[index2] === values[index3]) {
          continue;
        }

        if (values[index2] + values[index3] === badSum) {
          match = true;
          break;
        }
      }
      if (match) break;
    }

    if (! match) {
      break;
    }
  }


  // Solution 2
  let goodSum = 0;

  let startIndex = 0;


  for(;values[startIndex] !== badSum; startIndex++) {
    let testSum = values[startIndex];
    let lowest = testSum;
    let highest = testSum;

    let stopIndex = startIndex + 1;

    while (testSum < badSum) {
      testSum += values[stopIndex];

      if (values[stopIndex] < lowest) {
        lowest = values[stopIndex];
      }

      if (values[stopIndex] > highest) {
        highest = values[stopIndex];
      }

      stopIndex++;
    }
    
    if (testSum === badSum) {
      goodSum = lowest + highest;
      break;
    }
  }

  return [badSum, goodSum];
} 