export type SolutionFunc = (data: string) => Promise<number|string>;

const solutions: {[index: string]: SolutionFunc} = {}

export function registerSolutionFunc(day: number, index: number, solution: SolutionFunc) {
  solutions[`${day}:${index}`] = solution;
}

export function getSolutionFunc(day: number, index: number): SolutionFunc | undefined {
  return solutions[`${day}:${index}`];
}