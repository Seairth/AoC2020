import { countBy, isEmpty, negate } from "lodash";

export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n');

  let valid = 0;

  for(let line of lines.filter(negate(isEmpty))) {
    const result = /^(\d+)-(\d+) (.): (.+)$/.exec(line)!;
    const min = parseInt(result[1], 10);
    const max = parseInt(result[2], 10);
    const char = result[3];
    const pwd = result[4];

    const count = countBy(pwd)[char] || 0;

    if (count >= min && count <= max) {
      valid++;
    }
  }

  return valid;
};

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n');

  let valid = 0;

  for(let line of lines.filter(negate(isEmpty))) {
    const result = /^(\d+)-(\d+) (.): (.+)$/.exec(line)!;
    const pos1 = parseInt(result[1], 10);
    const pos2 = parseInt(result[2], 10);
    const char = result[3];
    const pwd = result[4];

    if (pwd.length >= pos1) {
      if (pwd.length >= pos2) {
        if ((pwd.charAt(pos1-1) === char) !== (pwd.charAt(pos2-1) === char)) {
          valid++;
        }
      } else {
        if (pwd.charAt(pos1-1) === char) {
          valid++;
        }
      }
    }
  }

  return valid;
}
