export type BingoLine = {
  type: "row" | "column" | "diagonal";
  index: number;
};
export type BingoResult = {
  hasBingo: boolean;
  lines: BingoLine[];
};

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
    const totalPossibleNumbers = BingoCard.COLUMN_RANGE * BingoCard.COLUMN_SIZE;

    if (this.drawnNumbers.size < totalPossibleNumbers) {
      do {
        randomNumber = this.getRandomNumber(1, totalPossibleNumbers);
      } while (this.drawnNumbers.has(randomNumber));
      this.drawnNumbers.add(randomNumber);
    } else {
      console.warn("All possible numbers have already been drawn.");
      return null;
    }

    return randomNumber;
  }

  checkBingoCard() {
    return this.card.every((number) => this.drawnNumbers.has(number));
  }

  checkBingo(): BingoResult {
    const card2DArray = this.getCard();
    let hasBingo = false;
    let lines: BingoLine[] = [];

    // Check rows
    for (let rowIndex = 0; rowIndex < card2DArray.length; rowIndex++) {
      const row = card2DArray[rowIndex];
      if (row.every((number) => this.drawnNumbers.has(number))) {
        hasBingo = true;
        lines.push({ type: "row", index: rowIndex });
      }
    }

    // Check columns
    for (let col = 0; col < BingoCard.COLUMN_SIZE; col++) {
      let isBingo = true;
      for (let row = 0; row < BingoCard.ROW_SIZE; row++) {
        if (!this.drawnNumbers.has(card2DArray[row][col])) {
          isBingo = false;
          break;
        }
      }
      if (isBingo) {
        hasBingo = true;
        lines.push({ type: "column", index: col });
      }
    }

    // Check diagonal top-left to bottom-right
    let isDiagonalBingo = true;
    for (let i = 0; i < BingoCard.ROW_SIZE; i++) {
      if (!this.drawnNumbers.has(card2DArray[i][i])) {
        isDiagonalBingo = false;
        break;
      }
    }
    if (isDiagonalBingo) {
      hasBingo = true;
      lines.push({ type: "diagonal", index: 0 });
    }

    // Check diagonal top-right to bottom-left
    isDiagonalBingo = true;
    for (let i = 0; i < BingoCard.ROW_SIZE; i++) {
      if (!this.drawnNumbers.has(card2DArray[i][BingoCard.ROW_SIZE - 1 - i])) {
        isDiagonalBingo = false;
        break;
      }
    }
    if (isDiagonalBingo) {
      hasBingo = true;
      lines.push({ type: "diagonal", index: 1 });
    }

    return { hasBingo, lines };
  }
}
