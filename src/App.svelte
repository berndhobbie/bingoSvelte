<script lang="ts">
  import "./app.css";
  import NumberGrid from "./components/NumberGrid.svelte";
  import { BingoCard } from "./lib/bingoCard";
  import { onMount } from "svelte";
  import { drawnNumbers } from "./lib/store";
  import { fly } from "svelte/transition";

  let cardNumbers: number[][] = [];
  let drawnNumber: number;
  let bingoCard: BingoCard;
  let isBingo = false;
  let autoDrawInterval: ReturnType<typeof setInterval> | null = null;
  let allNumbersDrawn = false;
  let autoDrawIntervalTime = 50;

  $: {
    allNumbersDrawn = drawnNumber === null;
  }

  onMount(() => {
    genNewCard();
  });

  const genNewCard = () => {
    bingoCard = new BingoCard();
    cardNumbers = bingoCard.getCard();
    drawnNumbers.set(new Set<number>());

    if (autoDrawInterval) {
      clearInterval(autoDrawInterval);
      autoDrawInterval = null;
    }
  };

  const drawNumber = () => {
    drawnNumber = bingoCard.drawNumber();
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
        if (isBingo) {
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
    if (bingoCard) {
      bingoCard.getDrawnNumbers().clear();
      for (const number of $drawnNumbers) {
        bingoCard.getDrawnNumbers().add(number);
      }
      isBingo = bingoCard.checkBingo();
    }
  }
</script>

{#if cardNumbers && bingoCard}
  <div class="flex flex-col p-2 items-center">
    <h1 class="text-5xl mb-4 font-mono">The Bingo Generator</h1>
    <NumberGrid {cardNumbers} {drawnNumbers} />
    <p>Drawn number: {drawnNumber || "None"}</p>
    <p>{isBingo ? "Bingo!" : "No Bingo"}</p>
    {#if isBingo}
      <h1
        class="text-5xl mb-4 font-mono"
        transition:fly={{ delay: 0, duration: 1000, x: 0, y: -50, opacity: 0 }}
        style="opacity: {isBingo ? 1 : 0};"
      >
        Congratulations! 🎉
      </h1>
    {/if}
  </div>
{/if}

<div class="flex justify-center space-x-4 my-4">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={genNewCard}
  >
    New Card
  </button>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={drawNumber}
  >
    Draw Number
  </button>
  <button
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    on:click={autoDraw}
  >
    AutoDraw
  </button>
</div>

{#if allNumbersDrawn}
  <p class="text-red-600">All possible numbers have been drawn.</p>
{/if}
