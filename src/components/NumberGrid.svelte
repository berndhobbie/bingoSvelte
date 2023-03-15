<script lang="ts">
  export let cardNumbers;
  export let drawnNumbers;
</script>

<div class="grid grid-cols-5 grid-rows-5 grid-flow-col w-80">
  {#each cardNumbers as row}
    {#each row as cell}
      <div
        class="border border-black p-2 font-extrabold flex justify-center items-center h-16 w-16 text-3xl"
        class:bg-green-200={$drawnNumbers.has(cell)}
      >
        {#if cell}
          <span>{cell}</span>
        {/if}
      </div>
    {/each}
  {/each}
</div>
