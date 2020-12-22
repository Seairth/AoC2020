import { findIndex, isEmpty, isEqual, partial } from "lodash";

export async function solution1(input: string): Promise<number> {
  const deckLines = input.split('\n\n');
  const deck1Lines = deckLines[0].split('\n').filter(l => !isEmpty(l)).slice(1);
  const deck2Lines = deckLines[1].split('\n').filter(l => !isEmpty(l)).slice(1);

  const deck1 = deck1Lines.map(l => parseInt(l, 10));
  const deck2 = deck2Lines.map(l => parseInt(l, 10));

  do {
    const card1 = deck1.shift()!;
    const card2 = deck2.shift()!;

    if (card1 > card2) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  } while (deck1.length && deck2.length);

  const winningDeck = deck1.length ? deck1 : deck2;

  const score = winningDeck.reduceRight((score, card, index) => {
    return score + (card * (winningDeck.length - index));
  }, 0);

  return score;
}

export async function solution2(input: string): Promise<number> {
  const deckLines = input.split('\n\n');
  const deck1Lines = deckLines[0].split('\n').filter(l => !isEmpty(l)).slice(1);
  const deck2Lines = deckLines[1].split('\n').filter(l => !isEmpty(l)).slice(1);

  const deck1 = deck1Lines.map(l => parseInt(l, 10));
  const deck2 = deck2Lines.map(l => parseInt(l, 10));

  const winningDeck = playRecursiveGame(deck1, deck2) === 1 ? deck1 : deck2;
  
  const score = winningDeck.reduceRight((score, card, index) => {
    return score + (card * (winningDeck.length - index));
  }, 0);

  return score;
}

function playRecursiveGame(deck1: number[], deck2: number[], depth = 1): number {
  const priorDeck1: number[][] = [];
  const priorDeck2: number[][] = [];

  let round = 1; 

  do {
    const priorMatch = findIndex(priorDeck1, partial(isEqual, deck1)); 

    if (priorMatch >= 0 && isEqual(priorDeck2[priorMatch], deck2)) {
      return 1; // we already played this combo. Player 1 wins automatically.
    }

    priorDeck1.push(deck1.slice());
    priorDeck2.push(deck2.slice());

    const card1 = deck1.shift()!;
    const card2 = deck2.shift()!;

    if (deck1.length >= card1 && deck2.length >= card2) {
      // recurse!
      if (playRecursiveGame(deck1.slice(0, card1), deck2.slice(0, card2), depth + 1) === 1) {
        deck1.push(card1, card2);
      } else {
        deck2.push(card2, card1);
      }
    } else {
      if (card1 > card2) {
        deck1.push(card1, card2);
      } else {
        deck2.push(card2, card1);
      }
    }

    round++;
  } while (deck1.length && deck2.length);

  return deck1.length ? 1 : 2;
}
