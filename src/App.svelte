<script lang="ts">
  import "./app.css";
  import Header from "./components/Header.svelte";
  import NumberGrid from "./components/NumberGrid.svelte";
  import { BingoCard } from "./lib/bingoCard";
  import { onMount } from "svelte";
  let bingoCard: BingoCard;
  let winnerNumbers: number[] = [];

  onMount(() => {
    genNewCard();
  });

  const genNewCard = () => {
    const newBingoCard = new BingoCard();
    newBingoCard.generate();
    bingoCard = newBingoCard;
  };

  const drawNumbers = () => {
    winnerNumbers = [];
    let availabeNumbers = 75;
    //an array tha hold the numbers from 1-75
    const allNumbers: number[] = [];
    for (let i = 1; i <= availabeNumbers; i++) {
      allNumbers.push(i);
    }
    //22 random number between 1 and 75
    for (let i = 0; i < 22; i++) {
      const randomNumber = Math.floor(Math.random() * availabeNumbers);
      winnerNumbers.push(allNumbers[randomNumber]);
      allNumbers.splice(randomNumber, 1);
      availabeNumbers--;
    }

    bingoCard.markNumbers(winnerNumbers);
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
    <button
      class="bg-green-500 hover:bg-green-400 p-2 rounded-md w-80 text-lg font-bold mt-2"
      on:click={() => drawNumbers()}>Draw Numbers</button
    >
  </div>
{/if}

<div class="flex space-x-2">
  {#each winnerNumbers as num}
    <div class="text-5xl font-mono">{num}</div>
  {/each}
</div>
