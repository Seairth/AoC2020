import { registerSolutionFunc } from "./solutionManager";

async function solution1(input: string): Promise<number> {
  const lines = input.split('\n');

  for (let offset = 0; offset < lines.length; offset++) {
    for (let offset2 = offset + 1; offset2 < lines.length; offset2++) {
      const v1 = parseInt(lines[offset], 10);
      const v2 = parseInt(lines[offset2], 10);

      if (v1 + v2 === 2020) {
        return (v1 * v2);
      }
    }
  }

  return -1;
};

async function solution2(input: string): Promise<number> {
  const lines = input.split('\n');

  for (let offset = 0; offset < lines.length; offset++) {
    for (let offset2 = offset + 1; offset2 < lines.length; offset2++) {
      for (let offset3 = offset2 + 1; offset3 < lines.length; offset3++) {
        const v1 = parseInt(lines[offset], 10);
        const v2 = parseInt(lines[offset2], 10);
        const v3 = parseInt(lines[offset3], 10);

        if (v1 + v2 + v3 === 2020) {
          return (v1 * v2 * v3);
        }
      }
    }
  }

  return -1;
}

registerSolutionFunc(1, 1, solution1);
registerSolutionFunc(1, 2, solution2);