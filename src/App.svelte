<script lang="ts">
  import "./app.css";
  import NumberGrid from "./components/NumberGrid.svelte";
  import { BingoCard } from "./lib/bingoCard";
  import { onMount } from "svelte";
  let cardNumbers: number[][] = [];

  onMount(() => {
    genNewCard();
  });

  const genNewCard = () => {
    let bingoCard = new BingoCard(1);
    cardNumbers = bingoCard.getCard(0);
  };
</script>

{#if cardNumbers}
  <div class="flex flex-col p-2 items-center">
    <h1 class="text-5xl mb-4 font-mono">The Bingo Generator</h1>
    <NumberGrid {cardNumbers} />
  </div>
{/if}
