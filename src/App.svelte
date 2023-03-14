<script lang="ts">
  import "./app.css";
  import { BingoCard } from "./lib/bingoCard";

  const bingoCard = new BingoCard();
  bingoCard.generate();
  console.log(bingoCard);
</script>

<!-- header -->
<div class="grid grid-cols-5 grid-rows-1 w-80">
  {#each bingoCard.card as letter}
    {#each letter.name as header}
      <div
        class="flex justify-center items-center border border-black p-2 bg-blue-700 text-white text-4xl font-extrabold h-16 w-16"
      >
        {#if header}
          {header}
        {/if}
      </div>
    {/each}
  {/each}
</div>

<!-- numbers -->
<div class="grid grid-cols-5 grid-rows-5 grid-flow-col w-80">
  {#each bingoCard.card as letter}
    {#each letter.numbers as cell}
      <div
        class="border border-black p-2 font-extrabold flex justify-center items-center h-16 w-16 text-2xl"
      >
        {#if cell}
          {cell}
        {/if}
      </div>
    {/each}
  {/each}
</div>
