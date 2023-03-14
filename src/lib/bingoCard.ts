interface BingoNumber {
  number: number;
  isDrawn: boolean;
}

interface NumberRow {
  name: string;
  numbers: BingoNumber[];
}

export class BingoCard {
  b: NumberRow;
  i: NumberRow;
  n: NumberRow;
  g: NumberRow;
  o: NumberRow;

  constructor() {
    this.b = { name: "B", numbers: [] };
    this.i = { name: "I", numbers: [] };
    this.n = { name: "N", numbers: [] };
    this.g = { name: "G", numbers: [] };
    this.o = { name: "O", numbers: [] };
  }

  get card(): NumberRow[] {
    return [this.b, this.i, this.n, this.g, this.o];
  }

  generate() {
    this.b.numbers = this.generateNumbers(1, 15);
    this.i.numbers = this.generateNumbers(16, 30);
    this.n.numbers = this.generateNumbers(31, 45);
    this.g.numbers = this.generateNumbers(46, 60);
    this.o.numbers = this.generateNumbers(61, 75);
  }

  private generateNumbers(min: number, max: number): BingoNumber[] {
    const bingoNumbers: BingoNumber[] = [];
    const allNumbers: number[] = [];
    for (let i = min; i <= max; i++) {
      allNumbers.push(i);
    }

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * allNumbers.length);
      const randomNum = allNumbers[randomIndex];
      bingoNumbers.push({ number: randomNum, isDrawn: false });
      allNumbers.splice(randomIndex, 1);
    }

    return bingoNumbers;
  }

  markNumbers = (winnerNumbers: number[]): void => {
    this.card.forEach((row) => {
      row.numbers.forEach((num) => {
        if (winnerNumbers.includes(num.number)) {
          num.isDrawn = true;
        }
      });
    });
    console.log(this.card);
  };
}
