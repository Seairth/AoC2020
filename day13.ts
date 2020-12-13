import { isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n');
  const arrival = parseInt(lines[0], 10);
  const services = lines[1].split(',').filter(s => s !== 'x').map(s => parseInt(s, 10));

  let shortestWait = arrival + Math.max(...services) + 1;
  let nextService = 0;

  for(let service of services) {
    const delta = (Math.ceil(arrival / service) * service) - arrival;
    if (delta < shortestWait) {
      shortestWait = delta;
      nextService = service;
    }
  }

  return (shortestWait * nextService);
}

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n');
  const services = lines[1].split(',').map(s => s === 'x' ? 1 : parseInt(s, 10));

  let increment = services[0];

  let t = 0;

  let foundT = true;
  
  do {
    t += increment;

    for (let i = 0; i < services.length; i++) {
      foundT = ((t + i) % services[i] === 0);

      if (foundT) {
        if (services[i] > 1) {
          increment = lcm(increment, services[i])
        }
      } else {
        break;     
      }
    }
  } while (! foundT);

  return t;
}


function lcm(x: number, y: number): number {
 return (!x || !y) ? 0 : Math.abs((x * y) / gcd(x, y));
}

function gcd(x: number, y: number): number {
 while(y) {
   let t = y;
   y = x % y;
   x = t;
 }

 return x;
}