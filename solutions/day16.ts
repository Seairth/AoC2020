import { isEmpty } from "lodash";

export async function solution1(input: string): Promise<number> {
  const notes = getNotes(input);

  let errorRate = 0;

  notes.nearby.forEach(ticket => {
    ticket.forEach(value => {
      let valid = false;
      
      Object.values(notes.fields).forEach(ranges => {
        if (value >= ranges[0][0] && value <= ranges[0][1]) {
          valid = true;
          return;
        }

        if (value >= ranges[1][0] && value <= ranges[1][1]) {
          valid = true;
          return;
        }
      });

      if (! valid) {
        errorRate += value;
      }
    });
  });

  return errorRate;
}

export async function solution2(input: string): Promise<number> {
  const notes = getNotes(input);

  let errorRate = 0;

  let validTickets: number[][] = [];

  notes.nearby.forEach(ticket => {
    let valid = true;

    ticket.forEach(value => {
      if (!valid) {
        return; // no point in looking further
      }

      let validValue = false;

      Object.values(notes.fields).forEach(ranges => {
        if (value >= ranges[0][0] && value <= ranges[0][1]) {
          validValue = true;
          return;
        }

        if (value >= ranges[1][0] && value <= ranges[1][1]) {
          validValue = true;
          return;
        }
      });

      valid = valid && validValue;
    });

    if (valid) {
      validTickets.push(ticket);
    }
  });

  notes.nearby = validTickets;

  let departureProduct = 1;

  const matches: string[][] = [];
  notes.ticket.forEach(() => matches.push([]));

  // Object.keys(notes.fields).filter(f => f.startsWith('departure')).forEach(field => {
  Object.keys(notes.fields).forEach(field => {
    const ranges = notes.fields[field];

    for(let i = 0; i < notes.ticket.length; i++) {
      let matchAll = true;

      notes.nearby.forEach(ticket => {
        if (ticket[i] >= ranges[0][0] && ticket[i] <= ranges[0][1]) {
          return;
        }

        if (ticket[i] >= ranges[1][0] && ticket[i] <= ranges[1][1]) {
          return;
        }

        matchAll = false;
      });

      if (matchAll) {
        matches[i].push(field);
      }
    }
  });


  for(let loop = 0; loop < Object.keys(notes.fields).length; loop++) {
    let field: string;

    matches.forEach((m, i) => {
      if (m.length === 1) {
        field = m[0];

        if (field.startsWith('departure')) {
          departureProduct *= notes.ticket[i];
        }
      }
    });

    matches.forEach(m => m.splice(m.indexOf(field), 1)); 
  }

  return departureProduct;
}

interface Notes {
  fields: {
    [key: string]: [number, number][]    
  },
  ticket: number[],
  nearby: number[][]
}

function getNotes(input: string): Notes {
  const lines = input.split('\n').filter(l => !isEmpty(l));

  const notes: Notes = {
    fields: {},
    ticket: [],
    nearby: []
  };

  let line = lines.shift()!;

  do {
    const match = /(.+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(line)!;

    notes.fields[match[1]] = [
      [parseInt(match[2], 10), parseInt(match[3], 10)], 
      [parseInt(match[4], 10), parseInt(match[5], 10)], 
    ];

    line = lines.shift()!;
  } while (line !== 'your ticket:');

  line = lines.shift()!;
  notes.ticket = line.split(',').map(v => parseInt(v, 10));

  lines.shift();

  lines.forEach(l => notes.nearby.push(l.split(',').map(v => parseInt(v, 10))));

  return notes;
}
