import { cloneDeep, isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n').filter(line => !isEmpty(line));
  const iterations = 6;

  const xSize = 8 + (2 * iterations) + 2;
  const ySize = 8 + (2 * iterations) + 2;
  const zSize = 1 + (2 * iterations) + 2;

  let cubes: string[][][] = [];

  for(let _x = 0; _x < xSize; _x++) {
    let yCubes: string[][] = [];

    for (let _y = 0; _y < ySize; _y++) {
      let zCubes: string[] = [];

      for (let _z = 0; _z < zSize; _z++) {
        zCubes.push('.');
      }

      yCubes.push(zCubes);
    }

    cubes.push(yCubes);
  }

  let x = iterations + 1;
  
  lines.forEach(line => {
    let y = iterations + 1;

    line.split('').forEach(cube => {
      let z = iterations + 1;
      cubes[x][y][z] = cube;
      y++;
    });
    x++;
  });

  for (let cycle = 0; cycle < 6; cycle++) {
    const newCubeState = cloneDeep(cubes);

    for (let x = 1; x < xSize -1 ; x++) {
      for (let y = 1; y < ySize - 1; y++) {
        for (let z = 1; z < zSize - 1; z++) {
          const count = countNearbyCubes(cubes, x, y, z);

          if (cubes[x][y][z] === '#') {
            if (count !== 2 && count !== 3) {
              newCubeState[x][y][z] = '.';
            }
          } else {
            if (count === 3) {
              newCubeState[x][y][z] = '#';
            }
          }          
        }          
      }  
    }

    cubes = newCubeState;
  }

  const active = cubes.reduce((acc, xCubes) => {
    return acc + xCubes.reduce((acc, yCubes) => {
      return acc + yCubes.reduce((acc, cube) => {
        return acc + (cube === '#' ? 1 : 0);
      }, 0);
    }, 0);
  }, 0);

  return active;
}

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n').filter(line => !isEmpty(line));
  const iterations = 6;

  const xSize = 8 + (2 * iterations) + 2;
  const ySize = 8 + (2 * iterations) + 2;
  const zSize = 1 + (2 * iterations) + 2;
  const wSize = 1 + (2 * iterations) + 2;

  let cubes: string[][][][] = [];

  for(let _x = 0; _x < xSize; _x++) {
    let yCubes: string[][][] = [];

    for (let _y = 0; _y < ySize; _y++) {
      let zCubes: string[][] = [];

      for (let _z = 0; _z < zSize; _z++) {
        let wCubes: string[] = [];

        for(let _w = 0; _w < wSize; _w++) {
          wCubes.push('.');
        }

        zCubes.push(wCubes);
      }

      yCubes.push(zCubes);
    }

    cubes.push(yCubes);
  }

  let x = iterations + 1;
  
  lines.forEach(line => {
    let y = iterations + 1;

    line.split('').forEach(cube => {
      let z = iterations + 1;
      let w = iterations + 1;
      cubes[x][y][z][w] = cube;
      y++;
    });
    x++;
  });

  for (let cycle = 0; cycle < 6; cycle++) {
    const newCubeState = cloneDeep(cubes);

    for (let x = 1; x < xSize -1 ; x++) {
      for (let y = 1; y < ySize - 1; y++) {
        for (let z = 1; z < zSize - 1; z++) {
          for (let w = 1; w < wSize - 1; w++) {
            const count = countNearbyHypercubes(cubes, x, y, z, w);
  
            if (cubes[x][y][z][w] === '#') {
              if (count !== 2 && count !== 3) {
                newCubeState[x][y][z][w] = '.';
              }
            } else {
              if (count === 3) {
                newCubeState[x][y][z][w] = '#';
              }
            }          
          }
        }          
      }  
    }

    cubes = newCubeState;
  }

  const active = cubes.reduce((acc, xCubes) => {
    return acc + xCubes.reduce((acc, yCubes) => {
      return acc + yCubes.reduce((acc, zCubes) => {
        return acc + zCubes.reduce((acc, cube) => {
          return acc + (cube === '#' ? 1 : 0);
        }, 0);
      }, 0);
    }, 0);
  }, 0);

  return active;
}

function countNearbyCubes(cubes: string[][][], x: number, y: number, z: number): number {
  let count = 0;

  for(let xDelta of [-1,0,1]) {
    for(let yDelta of [-1,0,1]) {
      for(let zDelta of [-1,0,1]) {
        if ((xDelta || yDelta || zDelta) && cubes[x+xDelta][y+yDelta][z+zDelta] === '#') {
          count++;
        }
      }
    }
  }

  return count;
}

function countNearbyHypercubes(cubes: string[][][][], x: number, y: number, z: number, w: number): number {
  let count = 0;

  for(let xDelta of [-1,0,1]) {
    for(let yDelta of [-1,0,1]) {
      for(let zDelta of [-1,0,1]) {
        for(let wDelta of [-1,0,1]) {
          if ((xDelta || yDelta || zDelta || wDelta) && cubes[x+xDelta][y+yDelta][z+zDelta][w+wDelta] === '#') {
            count++;
          }
        }
      }
    }
  }

  return count;
}
