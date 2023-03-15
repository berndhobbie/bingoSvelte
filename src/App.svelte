<script lang="ts">
  import "./app.css";
  import NumberGrid from "./components/NumberGrid.svelte";
  import { BingoCard } from "./lib/bingoCard";
  import { onMount } from "svelte";
  import { drawnNumbers } from "./lib/store";
  let cardNumbers: number[][] = [];
  let drawnNumber: number;
  let bingoCard: BingoCard;

  onMount(() => {
    genNewCard();
  });

  const genNewCard = () => {
    bingoCard = new BingoCard();
    cardNumbers = bingoCard.getCard();
    drawnNumbers.set(new Set<number>());
  };

  const drawNumber = () => {
    drawnNumber = bingoCard.drawNumber();
    drawnNumbers.update((set) => {
      set.add(drawnNumber);
      return set;
    });
  };
</script>

{#if cardNumbers && bingoCard}
  <div class="flex flex-col p-2 items-center">
    <h1 class="text-5xl mb-4 font-mono">The Bingo Generator</h1>
    <NumberGrid {cardNumbers} {drawnNumbers} />
    <p>Drawn number: {drawnNumber || "None"}</p>
  </div>
{/if}

<button on:click={genNewCard}>New Card</button>
<button on:click={drawNumber}>Draw Number</button>
