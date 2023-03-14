<script lang="ts">
  export let bingoCard;
</script>

<div class="grid grid-cols-5 grid-rows-5 grid-flow-col w-80">
  {#each bingoCard.card as letter}
    {#each letter.numbers as cell}
      <div
        class="border border-black p-2 font-extrabold flex justify-center items-center h-16 w-16 text-3xl"
      >
        {#if cell.number}
          <span class={cell.isDrawn ? "text-green-900" : "text-black"}
            >{cell.number}</span
          >
        {/if}
      </div>
    {/each}
  {/each}
</div>
