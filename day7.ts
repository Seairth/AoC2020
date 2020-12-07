import { isEmpty, negate } from "lodash";

export async function solution1(input: string): Promise<number> {
  return solve(input)[0];
};

export async function solution2(input: string): Promise<number> {
  return solve(input)[1];
}

function solve(input: string): [number, number] {
  const lines = input.split('\n');

  const rules: {[key:string]: {type:string, qty:number}[]} = {};

  for(const line of lines.filter(negate(isEmpty))) {
    const rule = line.slice(0, -1).split('s contain ');
    rules[rule[0]] = [];

    const ruleValues = rule[1].split(', ');

    if (ruleValues[0] === 'no other bags') {
      continue;
    }

    for (const ruleValue of ruleValues) {
      const value = /(\d+) (.+)/.exec(ruleValue)!;
      rules[rule[0]].push({
        type: value[2].endsWith('s') ? value[2].slice(0, -1) : value[2],
        qty: parseInt(value[1], 10)
      });
    }
  }

  // solution 1:
  const containsGold = new Set<string>();
  let lastCount = 0;

  do {
    lastCount = containsGold.size;

    for (const rule in rules) {
      const values = rules[rule];
  
      for (let value of values) {
        if (value.type === 'shiny gold bag' || containsGold.has(value.type)) {
          containsGold.add(rule);
        }
      }
    }
  } while (containsGold.size > lastCount)

  // solution 2:
  let countChildren = (children: {type:string, qty:number}[]): number => {
    let total = 0;
    for (const child of children) {
      total += child.qty + (child.qty * countChildren(rules[child.type])); 
    }
    return total;
  }

  const totalBags = countChildren(rules['shiny gold bag']);


  return [containsGold.size, totalBags];
}
