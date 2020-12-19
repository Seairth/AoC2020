import { isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n').filter(line => !isEmpty(line));

  let total = 0;

  for (const line of lines) {
    const tokens = tokenize(line);

    total += stackEval(tokens);
  }

  return total;
}

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n').filter(line => !isEmpty(line));

  let total = 0;

  for (const line of lines) {
    const tokens = tokenize(line);

    const result = stackEval2(tokens);

    total += result;
  }

  return total;
}

function tokenize(line: string): string[] {
  const tokens: string[] = [];

  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    
    if (char === ' ') {
      continue;
    } else if ('+*()'.includes(char)) {
      tokens.push(char);
    } else {
      let num = char;

      while(i+1 < line.length && '0123456789'.includes(line.charAt(i+1))) {
        num += line.charAt(++i);
      }
      tokens.push(num);
    }
  }

  return tokens;
}

function stackEval(tokens: string[]): number {
  let stack: (number|string)[] = [];
  let num = 0;

  for(const token of tokens) {
    switch (token) {
      case '+':
      case '*':
      case '(':
        stack.unshift(token);
        break;

      case ')':
        num = stack.shift() as number;
        stack.shift(); // remove lparen

        if (stack.length > 0 && stack[0] !== '(') {
          const op = stack.shift() as string;
          const operand = stack.shift() as number;

          if (op === '+') {
            num += operand;
          } else {
            num *= operand;
          }
        }

        stack.unshift(num);
        break;

      default:
        num = parseInt(token, 10);

        if (stack.length > 0 && stack[0] !== '(') {
          const op = stack.shift() as string;
          const operand = stack.shift() as number;

          if (op === '+') {
            num += operand;
          } else {
            num *= operand;
          }
        }

        stack.unshift(num);
      }
  }

  return stack[0] as number;
}

function stackEval2(tokens: string[]): number {
  let stack: (number|string)[] = [];
  let num = 0;

  for(const token of tokens) {
    switch (token) {
      case '+':
      case '*':
      case '(':
        stack.unshift(token);
        break;

      case ')':
        num = stack.shift() as number;
        
        while (stack[0] !== '(') {
          stack.shift(); // remove * operator
          num *= (stack.shift() as number);
        }

        stack.shift(); // remove lparen

        if (stack.length > 0 && stack[0] !== '(' && stack[0] !== '*') {
          stack.shift();  // remove + operator
          num += (stack.shift() as number);
        }

        stack.unshift(num);
        break;

      default:
        num = parseInt(token, 10);

        if (stack.length > 0 && stack[0] !== '(' && stack[0] !== '*') {
          stack.shift();  // remove + operator
          num += (stack.shift() as number);
        }
        stack.unshift(num);
    }
  }

  while (stack.length > 1) {
    num = stack.shift() as number;
    stack.shift(); // remove * operator
    num *= (stack.shift() as number);

    stack.unshift(num);
  }

  return stack[0] as number;
}
