<script lang="ts">
  import "./app.css";
  import NumberGrid from "./components/NumberGrid.svelte";
  import { BingoCard } from "./lib/bingoCard";
  import type { BingoLine } from "./lib/bingoCard";
  import { onMount } from "svelte";
  import { drawnNumbers } from "./lib/store";

  let cardNumbers1: number[][] = [];
  let cardNumbers2: number[][] = [];
  let bingoLines1: BingoLine[] = [];
  let bingoLines2: BingoLine[] = [];
  let drawnNumber: number;
  let bingoCard1: BingoCard;
  let bingoCard2: BingoCard;
  let isBingo1 = false;
  let isBingo2 = false;
  let autoDrawInterval: ReturnType<typeof setInterval> | null = null;
  let allNumbersDrawn = false;
  let autoDrawIntervalTime = 500;

  $: {
    allNumbersDrawn = drawnNumber === null;
  }

  onMount(() => {
    startGame();
  });

  const startGame = () => {
    genNewCard();
    autoDraw();
  };

  const genNewCard = () => {
    bingoCard1 = new BingoCard();
    bingoCard2 = new BingoCard();
    cardNumbers1 = bingoCard1.getCard();
    cardNumbers2 = bingoCard2.getCard();
    drawnNumbers.set(new Set<number>());

    if (autoDrawInterval) {
      clearInterval(autoDrawInterval);
      autoDrawInterval = null;
    }
  };

  const drawNumber = () => {
    drawnNumber = bingoCard1.drawNumber();
    if (drawnNumber === null) {
      if (autoDrawInterval) {
        clearInterval(autoDrawInterval);
        autoDrawInterval = null;
      }
      return;
    }
    drawnNumbers.update((set) => {
      set.add(drawnNumber);
      return set;
    });
  };

  const autoDraw = () => {
    if (autoDrawInterval === null) {
      autoDrawInterval = setInterval(() => {
        drawNumber();
        if (isBingo1 || isBingo2) {
          clearInterval(autoDrawInterval);
          autoDrawInterval = null;
        }
      }, autoDrawIntervalTime);
    } else {
      clearInterval(autoDrawInterval);
      autoDrawInterval = null;
    }
  };

  $: {
    if (bingoCard1 && bingoCard2) {
      bingoCard1.getDrawnNumbers().clear();
      bingoCard2.getDrawnNumbers().clear();
      for (const number of $drawnNumbers) {
        bingoCard1.getDrawnNumbers().add(number);
        bingoCard2.getDrawnNumbers().add(number);
      }
      const result1 = bingoCard1.checkBingo();
      const result2 = bingoCard2.checkBingo();
      isBingo1 = result1.hasBingo;
      isBingo2 = result2.hasBingo;
      bingoLines1 = result1.lines;
      bingoLines2 = result2.lines;
    }
  }
</script>

<div>
  <div class="flex flex-col p-2 items-center">
    <h1 class="text-5xl mb-4 font-mono">Two Player Bingo Game</h1>
    <div class="flex flex-row space-x-8">
      {#if cardNumbers1 && bingoCard1}
        <div class="flex flex-col items-center">
          <h2 class="text-3xl mb-4">Player 1</h2>
          <NumberGrid
            cardNumbers={cardNumbers1}
            {drawnNumbers}
            bingoLines={bingoLines1}
          />
          <p>{isBingo1 ? "Bingo!" : "No Bingo"}</p>
        </div>
      {/if}
      {#if cardNumbers2 && bingoCard2}
        <div class="flex flex-col items-center">
          <h2 class="text-3xl mb-4">Player 2</h2>
          <NumberGrid
            cardNumbers={cardNumbers2}
            {drawnNumbers}
            bingoLines={bingoLines2}
          />
          <p>{isBingo2 ? "Bingo!" : "No Bingo"}</p>
        </div>
      {/if}
    </div>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
      on:click={startGame}
    >
      Start New Game
    </button>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
      on:click={autoDraw}
    >
      {autoDrawInterval === null ? "Start Auto Draw" : "Stop Auto Draw"}
    </button>
    {#if allNumbersDrawn}
      <p class="text-xl mt-4">All numbers have been drawn!</p>
    {/if}
    <div class="mt-4 flex flex-col justify-center items-center">
      <h2 class="text-2xl mb-2">Drawn Numbers:</h2>
      <p class="text-xl">
        {Array.from($drawnNumbers).join(", ") || "None"}
      </p>
    </div>
  </div>
</div>
