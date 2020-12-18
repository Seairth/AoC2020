export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n');
  const mem = new Map<number, number>();

  let mask = 'X'.repeat(36);

  for(const line of lines) {
    if (line.startsWith('mask')) {
      mask = /^mask = ([X\d]+)$/.exec(line)![1];
    } else if (line.startsWith('mem')) {
      const parts = /^mem\[(\d+)\] = (\d+)$/.exec(line)!;
      const addr = parseInt(parts[1]);
      const value = parseInt(parts[2]);

      mem.set(addr, applyValueMask(value, mask));
    }
  }

  return Array.from(mem.values()).reduce((a, v) => a+v, 0);
}

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n');
  const mem = new Map<number, number>();

  let mask = 'X'.repeat(36);

  for(const line of lines) {
    if (line.startsWith('mask')) {
      mask = /^mask = ([X\d]+)$/.exec(line)![1];
    } else if (line.startsWith('mem')) {
      const parts = /^mem\[(\d+)\] = (\d+)$/.exec(line)!;
      const addr = parseInt(parts[1]);
      const value = parseInt(parts[2]);

      for(const _addr of applyAddrMask(addr, mask)) {
        mem.set(_addr, value);
      }
    }
  }

  return Array.from(mem.values()).reduce((a, v) => a+v, 0);
}

function applyValueMask(value: number, mask: string): number {
  let _value = value.toString(2).padStart(mask.length, '0').split('');

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== 'X') {
      _value[i] = mask[i];
    }
  }

  return parseInt(_value.join(''), 2);
}

function applyAddrMask(addr: number, mask: string): number[] {
  const addrs: number[] = [];

  let _addr = addr.toString(2).padStart(mask.length, '0').split('');
  let _mask = mask.split('');

  for (let i = 0; i < mask.length; i++) {
    if (_mask[i] === '1') {
      _addr[i] = _mask[i];
    }
  }

  const floats = _mask.reduce((s, n) => s + (n === 'X' ? 1 : 0), 0);

  for (let i = 0; i < Math.pow(2, floats); i++) {
    let float = 0;
    let _i = i.toString(2).padStart(floats, '0').split('').slice(-floats);

    for (let i2 = 0; i2 < _mask.length; i2++) {
      if (_mask[i2] === 'X') {
        _addr[i2] = _i[float++];
      }  
    }

    addrs.push(parseInt(_addr.join(''), 2));
  }

  return addrs;
}
