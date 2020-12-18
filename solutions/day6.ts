import { intersection, isEmpty, sum, uniq } from "lodash";

export async function solution1(input: string): Promise<number> {
  return solve(input)[0];
};

export async function solution2(input: string): Promise<number> {
  return solve(input)[1];
}

function solve(input: string): [number, number] {
  const lines = input.split('\n');
  
  let andAnswers = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let groupAndCounts = 0;

  let orAnswers = '';
  let groupOrCounts = 0;

  for (const line of lines) {
    if (! isEmpty(line)) {
      andAnswers = intersection(andAnswers, line.split(''));
      orAnswers += line;
    } else {
      groupAndCounts += andAnswers.length;
      groupOrCounts += uniq(orAnswers).length;

      andAnswers = 'abcdefghijklmnopqrstuvwxyz'.split('');
      orAnswers = '';
    }
  }

  return [groupOrCounts, groupAndCounts];
}
