import { isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  return solve(input, true, 1, 0);
}

export async function solution2(input: string): Promise<number> {
  return solve(input, false, 10, 1);
}

export async function solve(input: string, moveOwnship: boolean, wptX: number, wptY: number): Promise<number> {
  let instructions: string[] = input.split('\n').filter(v => !isEmpty(v));

  let x = 0;
  let y = 0;

  for(const instr of instructions) {
    const action = instr.slice(0, 1);
    const value = parseInt(instr.slice(1));

    let temp: number;

    switch (action) {
      case 'E':
        if (moveOwnship) {
          x += value;
        } else {
          wptX += value;
        }
        break;
      case 'W':
        if (moveOwnship) {
          x -= value;
        } else {
          wptX -= value;
        }
        break;
      case 'S':
        if (moveOwnship) {
          y -= value;
        } else {
          wptY -= value;
        }
        break;
      case 'N':
        if (moveOwnship) {
          y += value;
        } else {
          wptY += value;
        }
        break;
      case 'L':
        temp = wptX; wptX = - wptY; wptY = temp;

        if (value >= 180) {
          temp = wptX; wptX = - wptY; wptY = temp;
  
          if (value === 270) {
            temp = wptX; wptX = - wptY; wptY = temp;
          }
        }
        break;
      case 'R':
        temp = wptY; wptY = - wptX; wptX = temp;

        if (value >= 180 ) {
          temp = wptY; wptY = - wptX; wptX = temp;
    
          if (value === 270) {
            temp = wptY; wptY = - wptX; wptX = temp;
          }
        }
        break;
      case 'F':
        x += (wptX * value);
        y += (wptY * value);
        break;
    }
  }

  return (Math.abs(x) + Math.abs(y));
}
