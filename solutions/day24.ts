import { isEmpty, uniqBy } from "lodash";

export async function solution1(input: string): Promise<number> {
  let lines = input.split('\n').filter(l => !isEmpty(l));

  const grid = getInitialGrid(lines);

  return grid.reduce((black, row) => black + row.reduce((black, col) => black + (col ? 1 : 0), 0), 0);
}

export async function solution2(input: string): Promise<number> {
  let lines = input.split('\n').filter(l => !isEmpty(l));

  const grid = getInitialGrid(lines);

  for(let day = 0; day < 100; day++) {
    const flipList: [number, number][] = [];
    const whiteList: [number, number][] = [];

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x]) {
          // black tile.  flip if zero or more than two surrounding tiles are white.
          // also add each white tile to the whitelist to check for flipping back to black.

          let count = 0;

          if (grid[y][x-1]) {
            count++;
          } else {
            whiteList.push([x-1, y]);
          }

          if (grid[y][x+1]) {
            count++;
          } else {
            whiteList.push([x+1, y]);
          }

          if (grid[y-1][x+1]) {
            count++;
          } else {
            whiteList.push([x+1, y-1]);
          }            

          if (grid[y+1][x-1]) {
            count++;
          } else {
            whiteList.push([x-1, y+1]);
          }            

          if (grid[y-1][x]) {
            count++;
          } else {
            whiteList.push([x, y-1]);
          }            

          if (grid[y+1][x]) {
            count++;
          } else {
            whiteList.push([x, y+1]);
          }            

          if (count === 0 || count > 2) {
            flipList.push([x, y]);
          }
        }
      }
    }

    const uniqWhiteList = uniqBy(whiteList, ([x,y])=>y*1000+x)
    
    uniqWhiteList.forEach(([x, y]) => {
      let count = 0;

      if (grid[y][x-1]) {
        count++;
      }

      if (grid[y][x+1]) {
        count++;
      }

      if (grid[y-1][x+1]) {
        count++;
      }            

      if (grid[y+1][x-1]) {
        count++;
      }            

      if (grid[y-1][x]) {
        count++;
      }            

      if (grid[y+1][x]) {
        count++;
      }            

      if (count === 2) {
        flipList.push([x, y]);
      }
    });

    flipList.forEach(([x,y]) => grid[y][x] = !grid[y][x]);
  }

  return grid.reduce((black, row) => black + row.reduce((black, col) => black + (col ? 1 : 0), 0), 0);
}

function getInitialGrid(lines: string[]): boolean[][] {
  const grid: boolean[][] = Array(1000);

  for (let i = 0; i < 1000; i++) {
    grid[i] = Array(1000);
  }

  for (const line of lines) {
    const pattern = /(e|w|(n|s)(e|w))/g;

    let x = 500;
    let y = 500;

    let match = pattern.exec(line);

    do {
      switch(match![1]) {
        case 'e':
          x++;
          break;
        case 'w':
          x--;
          break;
        case 'ne':
          x++;
          y--;
          break;
        case 'nw':
          y--;
          break;
        case 'se':
          y++;
          break;
        case 'sw':
          x--;
          y++;
          break;
      }

      match = pattern.exec(line);
    } while (match !== null);

    grid[y][x] = !grid[y][x];
  }
  
  return grid;
}
