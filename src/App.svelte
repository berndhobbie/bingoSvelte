<script lang="ts">
  import "./app.css";
  import Header from "./components/Header.svelte";
  import NumberGrid from "./components/NumberGrid.svelte";
  import { BingoCard } from "./lib/bingoCard";
  import { onMount } from "svelte";
  let bingoCard: BingoCard;

  onMount(() => {
    genNewCard();
  });

  const genNewCard = () => {
    const newBingoCard = new BingoCard();
    newBingoCard.generate();
    bingoCard = newBingoCard;
  };
</script>

{#if bingoCard}
  <div class="flex flex-col p-2 items-center">
    <h1 class="text-5xl mb-4 font-mono">The Bingo Generator</h1>
    <Header {bingoCard} />
    <NumberGrid {bingoCard} />
    <button
      class="bg-orange-500 hover:bg-orange-400 p-2 rounded-md w-80 text-lg font-bold mt-2"
      on:click={() => genNewCard()}>New Numbers</button
    >
  </div>
{/if}
