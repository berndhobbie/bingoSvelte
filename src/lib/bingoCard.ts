export class BingoCard {
  private static readonly ROW_SIZE = 5;
  private static readonly COLUMN_SIZE = 5;
  private static readonly COLUMN_RANGE = 15;

  private card: number[]; // define the 'card' property with type annotation
  private drawnNumbers: Set<number>;

  constructor() {
    this.drawnNumbers = new Set<number>();
    this.card = this.generateCard();
  }

  getCard(): number[][] {
    const card2DArray: number[][] = [];

    for (let row = 0; row < BingoCard.ROW_SIZE; row++) {
      const rowNumbers: number[] = [];
      for (let col = 0; col < BingoCard.COLUMN_SIZE; col++) {
        const number = this.card[col + row * BingoCard.COLUMN_SIZE];
        rowNumbers.push(number);
      }
      card2DArray.push(rowNumbers);
    }
    return card2DArray;
  }

  isNumberDrawn(number: number): boolean {
    return this.drawnNumbers.has(number);
  }

  getDrawnNumbers(): Set<number> {
    return this.drawnNumbers;
  }

  generateCard() {
    const card = [];
    for (let col = 0; col < BingoCard.COLUMN_SIZE; col++) {
      const columnNumbers = this.generateUniqueNumbers(BingoCard.ROW_SIZE, col);
      card.push(...columnNumbers);
    }
    return card;
  }

  generateUniqueNumbers(count, columnIndex) {
    const numbers = new Set<number>();
    const columnMin = columnIndex * BingoCard.COLUMN_RANGE + 1;
    const columnMax = (columnIndex + 1) * BingoCard.COLUMN_RANGE;
    while (numbers.size < count) {
      const columnNumber = this.getRandomNumber(columnMin, columnMax);
      numbers.add(columnNumber);
    }
    return Array.from(numbers);
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  drawNumber() {
    let randomNumber;
    do {
      randomNumber = this.getRandomNumber(
        1,
        BingoCard.COLUMN_RANGE * BingoCard.COLUMN_SIZE
      );
    } while (this.drawnNumbers.has(randomNumber));
    this.drawnNumbers.add(randomNumber);
    return randomNumber;
  }

  checkBingoCard() {
    return this.card.every((number) => this.drawnNumbers.has(number));
  }
}
