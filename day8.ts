export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n');
  
  return run(lines)[0];
};

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n');

  let testLine = 0;

  while (testLine < lines.length - 1) {
    while (lines[testLine].startsWith('acc ')) {
      testLine++;
    }
  
    lines[testLine] = swap(lines[testLine]);
  
    const result = run(lines.slice());

    if (! result[1]) {
      return result[0];
    }

    lines[testLine] = swap(lines[testLine]);
    testLine++;
  }

  return -1;
}

function swap(line: string): string {
  if (line.startsWith('nop ')) {
    return `jmp ${line.split(' ')[1]}`;
  }
  
  return `nop ${line.split(' ')[1]}`;
}

function solve(input: string): [number, number] {
  const lines = input.split('\n');


  let accumulator = 0;
  let offset = 0;

  do {
    const op = lines[offset].split(' ');

    if (op.length === 3) {
      break;
    } else {
      lines[offset] += ' *';
    }

    switch (op[0]) {
      case 'acc':
        accumulator += parseInt(op[1], 10);
        offset++;
        break;

      case 'jmp':
        offset += parseInt(op[1], 10);
        break;
      
      case 'nop':
        offset++;
    }
  } while (true);


  return [accumulator, -1];
}

function run(lines: string[]): [number, boolean] {
  let accumulator = 0;
  let offset = 0;

  do {
    const op = lines[offset].split(' ');

    if (op.length === 3) {
      return [accumulator, true];
    } else {
      lines[offset] += ' *';
    }

    switch (op[0]) {
      case 'acc':
        accumulator += parseInt(op[1], 10);
        offset++;
        break;

      case 'jmp':
        offset += parseInt(op[1], 10);
        break;
      
      case 'nop':
        offset++;
    }
  } while (offset < lines.length - 1);


  return [accumulator, false];
}