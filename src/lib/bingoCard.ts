interface NumberRow {
  name: string;
  numbers: number[];
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

  private generateNumbers(min: number, max: number): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      while (numbers.includes(random)) {
        random = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      numbers.push(random);
    }
    return numbers;
  }
}
