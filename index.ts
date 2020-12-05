import fs = require('fs');
import readline = require('readline');
import util = require('util');
import { isUndefined } from "lodash";
import { getSolutionFunc } from './solutionManager';

for (let day = 1; day <= 4; day++) {
  require(`./day${day}`);
}

function validateDay(value: number): number {
  if (Number.isNaN(value) || value < 1 || value > 25) {
    throw("not a day between 1 and 25");
  }
  
  return value;
}

async function getData(day: number): Promise<string> {
  return util.promisify(fs.readFile)(`input/day${day}.txt`).then(buffer => buffer.toString());
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  try {
    const inputFunc = (prompt: string) => new Promise<number>(resolve => rl.question(prompt , answer => resolve(Number.parseInt(answer, 10))));

    const day = await inputFunc("Which day? ").then(validateDay);
    
    const data = await getData(day);

    const solutionFunc1 = getSolutionFunc(day, 1);

    if (! isUndefined(solutionFunc1)) {
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
