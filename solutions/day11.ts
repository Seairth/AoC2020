import { cloneDeep, isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  let grid: string[][] = input.split('\n').filter(v => !isEmpty(v)).map(v => {
    let line = v.split('');
    line.unshift('.');
    line.push('.');
    return line
  });

  grid.unshift('.'.repeat(grid[0].length).split(''));
  grid.push('.'.repeat(grid[0].length).split(''));
  let changed: boolean;


  do {
    changed = false;

    const newGrid = cloneDeep(grid);

    for (let rIndex = 1; rIndex < grid.length - 1; rIndex++) {

      for (let cIndex = 1; cIndex < grid[rIndex].length - 1; cIndex++) {
        const occupied = countOccupied(grid, rIndex, cIndex);

        switch (grid[rIndex][cIndex]) {
          case 'L':
            if (occupied === 0) {
              changed = true;
              newGrid[rIndex][cIndex] = '#';
            }

            break;

          case '#':
            if (occupied >= 4) {
              changed = true;
              newGrid[rIndex][cIndex] = 'L';
            }

            break;
        } 
      }
    }

    grid = newGrid;
  } while (changed);

  return grid.reduce((occupied, row) => {
    return occupied + row.reduce((occupied, cell) => {
      return occupied + (cell === '#' ? 1 : 0);
    }, 0);
  }, 0);
}

export async function solution2(input: string): Promise<number> {
  let grid: string[][] = input.split('\n').filter(v => !isEmpty(v)).map(v => v.split(''));

  let changed: boolean;

  do {
    changed = false;

    const newGrid = cloneDeep(grid);

    for (let rIndex = 0; rIndex < grid.length; rIndex++) {
      for (let cIndex = 0; cIndex < grid[rIndex].length; cIndex++) {
        const occupied = countOccupied2(grid, rIndex, cIndex);

        switch (grid[rIndex][cIndex]) {
          case 'L':
            if (occupied === 0) {
              changed = true;
              newGrid[rIndex][cIndex] = '#';
            }

            break;

          case '#':
            if (occupied >= 5) {
              changed = true;
              newGrid[rIndex][cIndex] = 'L';
            }

            break;
        } 
      }
    }

    grid = newGrid;
  } while (changed);

  return grid.reduce((occupied, row) => {
    return occupied + row.reduce((occupied, cell) => {
      return occupied + (cell === '#' ? 1 : 0);
    }, 0);
  }, 0);
}

function countOccupied(grid: string[][], rIndex: number, cIndex: number): number {
  let occupied = (grid[rIndex][cIndex] === "#") ? -1 : 0;

  for (let rIndex2 = rIndex - 1; rIndex2 <= rIndex + 1; rIndex2++) {
    for (let cIndex2 = cIndex - 1; cIndex2 <= cIndex + 1; cIndex2++) {
      occupied += (grid[rIndex2][cIndex2] === '#') ? 1: 0;
    }
  }

  return occupied;
}

function countOccupied2(grid: string[][], rIndex: number, cIndex: number): number {
  let occupied = 0;

  // Up
  for (let rIndex2 = rIndex - 1; rIndex2 >= 0; rIndex2--) {
    if (['#', 'L'].includes(grid[rIndex2][cIndex])) {
      occupied += (grid[rIndex2][cIndex] === '#' ? 1 : 0);
      break;
    }
  }

  // Down
  for (let rIndex2 = rIndex + 1; rIndex2 < grid.length; rIndex2++) {
    if (['#', 'L'].includes(grid[rIndex2][cIndex])) {
      occupied += (grid[rIndex2][cIndex] === '#' ? 1 : 0);
      break;
    }
  }

  // Left
  for (let cIndex2 = cIndex - 1; cIndex2 >= 0; cIndex2--) {
    if (['#', 'L'].includes(grid[rIndex][cIndex2])) {
      occupied += (grid[rIndex][cIndex2] === '#' ? 1 : 0);
      break;
    }
  }

  // Right
  for (let cIndex2 = cIndex + 1; cIndex2 < grid[rIndex].length; cIndex2++) {
    if (['#', 'L'].includes(grid[rIndex][cIndex2])) {
      occupied += (grid[rIndex][cIndex2] === '#' ? 1 : 0);
      break;
    }
  }

  // Up-Left
  for (let rIndex2 = rIndex - 1; rIndex2 >= 0; rIndex2--) {
    let cIndex2 = cIndex - (rIndex - rIndex2);
    if (cIndex2 >= 0) {
      if (['#', 'L'].includes(grid[rIndex2][cIndex2])) {
        occupied += (grid[rIndex2][cIndex2] === '#' ? 1 : 0);
        break;
      }  
    }
  }

  // Up-Right
  for (let rIndex2 = rIndex - 1; rIndex2 >= 0; rIndex2--) {
    let cIndex2 = cIndex + (rIndex - rIndex2);
    if (cIndex2 < grid[rIndex2].length) {
      if (['#', 'L'].includes(grid[rIndex2][cIndex2])) {
        occupied += (grid[rIndex2][cIndex2] === '#' ? 1 : 0);
        break;
      }  
    }
  }

  // Down-Left
  for (let rIndex2 = rIndex + 1; rIndex2 < grid.length; rIndex2++) {
    let cIndex2 = cIndex - (rIndex2 - rIndex);
    if (cIndex2 >= 0) {
      if (['#', 'L'].includes(grid[rIndex2][cIndex2])) {
        occupied += (grid[rIndex2][cIndex2] === '#' ? 1 : 0);
        break;
      }  
    }
  }

  // Dow-Right
  for (let rIndex2 = rIndex + 1; rIndex2 < grid.length; rIndex2++) {
    let cIndex2 = cIndex + (rIndex2 - rIndex);
    if (cIndex2 < grid[rIndex2].length) {
      if (['#', 'L'].includes(grid[rIndex2][cIndex2])) {
        occupied +=  (grid[rIndex2][cIndex2] === '#' ? 1 : 0);
        break;
      }  
    }
  }

  return occupied;
}