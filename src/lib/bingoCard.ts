export class BingoCard {
  private static readonly ROW_SIZE = 5;
  private static readonly COLUMN_SIZE = 5;
  private static readonly COLUMN_RANGE = 15;

  private cards: number[][]; // define the 'cards' property with type annotation
  private drawnNumbers: Set<number>;

  constructor(numberOfCards: number) {
    this.drawnNumbers = new Set<number>();
    this.cards = Array.from({ length: numberOfCards }, () =>
      this.generateCard()
    );
  }

  getCard(cardIndex: number): number[][] {
    const card = this.cards[cardIndex];
    const card2DArray: number[][] = [];

    for (let row = 0; row < BingoCard.ROW_SIZE; row++) {
      const rowNumbers: number[] = [];
      for (let col = 0; col < BingoCard.COLUMN_SIZE; col++) {
        const number = card[col + row * BingoCard.COLUMN_SIZE];
        rowNumbers.push(number);
      }
      card2DArray.push(rowNumbers);
    }
    return card2DArray;
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
    const numbers = new Set();
    const columnMin = columnIndex * BingoCard.COLUMN_RANGE + 1;
    const columnMax = (columnIndex + 1) * BingoCard.COLUMN_RANGE;
    while (numbers.size < count) {
      const columnNumber = this.getRandomNumber(columnMin, columnMax);
      if (!numbers.has(columnNumber)) {
        numbers.add(columnNumber);
      }
    }
    return Array.from(numbers);
  }

  getRandomNumber(min, max) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (this.drawnNumbers.has(randomNumber));
    return randomNumber;
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

  checkBingoCard(cardIndex) {
    const card = this.cards[cardIndex];
    return card.every((number) => this.drawnNumbers.has(number));
  }

  displayCard(cardIndex) {
    const card = this.cards[cardIndex];
    let output = "";
    for (let col = 0; col < BingoCard.COLUMN_SIZE; col++) {
      for (let row = 0; row < BingoCard.ROW_SIZE; row++) {
        const number = card[col + row * BingoCard.COLUMN_SIZE];
        output += `${number.toString().padStart(2, "0")} `;
      }
      output += "\n";
    }
    return output;
  }
}
