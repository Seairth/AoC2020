import { includes, isEmpty, pull } from "lodash";
import { registerSolutionFunc } from "./solutionManager";

function between(v: number, min: number, max: number): boolean {
  return (v >= min) && (v <= max);
}
function validDate(v: string, min: number, max: number): boolean {
  const value = parseInt(v, 10);
  return v.length === 4 && between(value, min, max);
}

function validHeight(v: string): boolean {
  const value = parseInt(v, 10);

  if (v.endsWith('cm')) {
    return between(value, 150, 193);
  }

  return between(value, 59, 76);
}

type fieldNames = 'byr' | 'iyr' | 'eyr' | 'hgt' | 'hcl' | 'ecl' | 'pid';

const fieldRules: { [key in fieldNames]: (v: string) => boolean} = {
  byr: (v:string): boolean =>  validDate(v, 1920, 2002),
  iyr: (v: string): boolean => validDate(v, 2010, 2020),
  eyr: (v: string): boolean => validDate(v, 2020, 2030),
  hgt: (v: string): boolean => validHeight(v),
  hcl: (v: string): boolean => {
    if (v.length !== 7) {
      return false;
    }

    if (v.charAt(0) !== '#') {
      return false;
    }

    for(let c of v.slice(1)) {
      if (! '0123456789abcdef'.includes(c)) {
        return false;
      }
    }

    return true;  },
  ecl: (v: string): boolean => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: (v: string): boolean => {
    if (v.length !== 9) {
      return false;
    }

    for(let c of v) {
      if (! '0123456789'.includes(c)) {
        return false;
      }
    }

    return true;
  },
  // 'cid'
};

async function solution1(input: string): Promise<number> {
  const lines = input.split('\n');

  let validCount = 0;
  let fields = Object.keys(fieldRules);

  for (let line of lines) {
    if (isEmpty(line)) {
      if (fields.length === 0) {
        validCount++;
      }
      fields = Object.keys(fieldRules);
    } else {
      for (let field of line.split(' ')) {
        const fieldName = field.split(':')[0];
        fields = pull(fields, fieldName);
      }  
    }
  }

  if (fields.length === 0) {
    validCount++;
  }

  return validCount;
};

async function solution2(input: string): Promise<number> {
  const lines = input.split('\n');

  let validCount = 0;
  let fields = Object.keys(fieldRules);

  for (let line of lines) {
    if (isEmpty(line)) {
      if (fields.length === 0) {
        validCount++;
      }
      fields = Object.keys(fieldRules);
    } else {
      for (let field of line.split(' ')) {
        const [fieldName, fieldValue] = field.split(':');

        const testFunc = fieldRules[fieldName as fieldNames];

        if (testFunc && testFunc(fieldValue)) {
          fields = pull(fields, fieldName);
        }
      }  
    }
  }

  if (fields.length === 0) {
    validCount++;
  }

  return validCount;
}



registerSolutionFunc(4, 1, solution1);
registerSolutionFunc(4, 2, solution2);