import fetch from 'node-fetch';
import fs from 'fs/promises';
import readline from 'readline';
import { isUndefined } from 'lodash';

import { getSolutionFunc, registerSolutionFunc } from './solutionManager';

const YEAR = 2020;

for (let day = 1; day <= 25; day++) {
  try {
    const solutions = require(`./solutions/day${day}`);
    registerSolutionFunc(day, 1, solutions.solution1);
    registerSolutionFunc(day, 2, solutions.solution2);
  }
  catch {
    break;
  }
}

function validateDay(value: number): number {
  if (Number.isNaN(value) || value < 1 || value > 25) {
    throw("not a day between 1 and 25");
  }
  
  return value;
}

async function getData(day: number): Promise<string> {
  try {
    await fs.access(`./input/day${day}.txt`);
  }
  catch {
    const cookies = JSON.parse((await fs.readFile('./input/cookies.json')).toString());
    let cookieData = "";

    for(const name in cookies) {
      cookieData += `${name}=${cookies[name]};`;
    }

    const response = await fetch(`https://www.adventofcode.com/${YEAR}/day/${day}/input`, {
      headers: {
        cookie: cookieData
      }
    });

    const data = await response.text();
    await fs.writeFile(`./input/day${day}.txt`, data);

    return data;
  }

  return fs.readFile(`input/day${day}.txt`).then(buffer => buffer.toString());
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  try {
    const inputFunc = (prompt: string) => new Promise<number>(resolve => rl.question(prompt , answer => resolve(Number.parseInt(answer, 10))));

    const day = await inputFunc("Which day? ").then(validateDay);
    
    const solutionFunc1 = getSolutionFunc(day, 1);
    
    if (! isUndefined(solutionFunc1)) {
      const data = await getData(day);

      const answer1 = await solutionFunc1(data);
      console.log(`Day ${day} answer A: ${answer1}`);

      const solutionFunc2 = getSolutionFunc(day, 2);

      if(! isUndefined(solutionFunc2)) {
        const answer2 = await solutionFunc2(data);
        console.log(`Day ${day} answer B: ${answer2}`);
      }
    }
  }
  catch(error) {
    console.log(error);
  }
  finally {
    rl.close();    
  }
}

main();
