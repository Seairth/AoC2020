import fetch from 'node-fetch';
import fs from 'fs/promises';
import readline from 'readline';
import { isEmpty, isUndefined } from 'lodash';

import { getSolutionFunc, registerSolutionFunc } from './solutionManager';

const YEAR = 2020;

for (let day = 1; day <= 25; day++) {
  try {
    const solutions = require(`./solutions/day${day}`);
    registerSolutionFunc(day, 1, solutions.solution1);
    registerSolutionFunc(day, 2, solutions.solution2);
  }
  catch {
    // day not found. continue...
  }
}

function getDay(): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const today = new Date();

  return new Promise<number>(resolve => rl.question(`Which Day? [${today.getDate()}]` , answer => {
    let v: number;

    if (isEmpty(answer)) {
      v = today.getDate();
    } else {
      v = Number.parseInt(answer, 10);
    }

    rl.close();    

    resolve(v);
  }));
}

function validateDay(value: number): number {
  if (Number.isNaN(value) || value < 1 || value > 25) {
    throw("Day is not between 1 and 25.");
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
  try {
    const day = validateDay(await getDay())
    
    const data = await getData(day);

    for (let part of [1, 2]) {
      const solution = getSolutionFunc(day, part);
      
      if (isUndefined(solution)) {
        console.log(`Day ${day} solution ${part} not found.`);
      } else {
        const answer = await solution(data);
        console.log(`Day ${day} answer ${part}: ${answer}`);
      }
    }
  }
  catch(error) {
    console.log(error);
  }
}

main();
