type Node = {
  cup: number;
  next?: Node;
};

export async function solution1(input: string): Promise<number> {
  let cups = input.split('').map(n => parseInt(n, 10));

  const lowestCup = Math.min(...cups);

  let currentIndex = 0
  let currentCup = cups[currentIndex];

  let threeCups: number[];

  for(let round = 0; round < 100; round++) {
    // pick up cups
    if (currentIndex + 3 < cups.length) {
      threeCups = cups.splice(currentIndex + 1, 3);
    } else {
      // wrap around
      threeCups = cups.splice(currentIndex + 1);
      threeCups.push(...cups.splice(0, 3 - threeCups.length));
    }

    // find where to put cups
    let destinationCup: number;

    if (currentCup === lowestCup) {
      destinationCup = Math.max(...cups);
    } else {
      destinationCup = currentCup;
      while (true) {
        destinationCup--;

        if (cups.includes(destinationCup)) {
          break;
        } else if (destinationCup === lowestCup) {
          destinationCup = Math.max(...cups);
          break;
        }
      }
    }

    let destinationIndex = cups.indexOf(destinationCup);
    cups.splice(destinationIndex + 1, 0, ...threeCups);

    // get new current cup
    currentIndex = (cups.indexOf(currentCup) + 1) % cups.length;
    currentCup = cups[currentIndex];
  }

  const answer: string[] = [];
  const startIndex = cups.indexOf(1);

  if (startIndex === cups.length - 1) {
    answer.push(...cups.slice(0, -1).map(v => v.toString()));
  } else {
    answer.push(...cups.slice(startIndex + 1).map(v => v.toString()));

    if (startIndex > 0) {
      answer.push(...cups.slice(0, startIndex).map(v => v.toString()));
    }
  }

  console.log(answer.join(''));
  return 0;
}

export async function solution2(input: string): Promise<number> {

  const cupNodes: Node[] = input.split('').map<Node>(n => ({ cup: parseInt(n, 10) }));

  let currentNode = cupNodes[0];
  let tempNode = currentNode;
  let low = currentNode.cup;
  let high = currentNode.cup;

  cupNodes.slice(1).forEach(node => {
    low = Math.min(low, node.cup);
    high = Math.max(high, node.cup);

    tempNode = tempNode.next = node;
  });

  for (let index = cupNodes.length; index < 1_000_000; index++) {
    tempNode = tempNode.next = { cup: ++high };
  }

  tempNode.next = currentNode;

  const nodeLookup: Node[] = Array(high + 1);
  
  nodeLookup[currentNode.cup] = currentNode;

  tempNode = currentNode.next!;

  while (tempNode != currentNode) {
    nodeLookup[tempNode.cup] = tempNode;
    tempNode = tempNode.next!;
  }

  let threeCups: Node;

  for(let round = 0; round < 10_000_000; round++) {

    threeCups = currentNode.next!;

    currentNode.next = threeCups.next!.next!.next!;

    // find where to put cups
    let destination = currentNode.cup === low ? high : currentNode.cup - 1;

    while(destination === threeCups.cup || destination === threeCups.next!.cup || destination === threeCups.next!.next!.cup) {
      if (destination === low) {
        destination = high;
      } else {
        destination--;
      }
    }

    tempNode = nodeLookup[destination];

    threeCups.next!.next!.next = tempNode.next;
    tempNode.next = threeCups;

    currentNode = currentNode.next!;
  }

  while (currentNode.cup !== 1) {
    currentNode = currentNode.next!;
  }

  return currentNode.next!.cup * currentNode.next!.next!.cup;
}
