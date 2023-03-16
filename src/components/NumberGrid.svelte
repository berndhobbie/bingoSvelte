<script lang="ts">
  export let cardNumbers;
  export let drawnNumbers;
  export let bingoLines;
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div class="grid grid-cols-5 grid-rows-5 grid-flow-col w-80">
  {#each cardNumbers as row, rowIndex (rowIndex)}
    {#each row as cell, cellIndex (cellIndex)}
      <div
        class="border border-black p-2 font-extrabold flex justify-center items-center h-16 w-16 text-3xl"
        class:bg-green-200={$drawnNumbers.has(cell)}
        class:highlighted={bingoLines.some(
          (line) =>
            line.numbers &&
            ((line.type === "row" &&
              line.index === rowIndex &&
              line.numbers.includes(cell)) ||
              (line.type === "column" &&
                line.index === cellIndex &&
                line.numbers.includes(cell)) ||
              (line.type === "diagonal" &&
                (line.index === 0
                  ? rowIndex === cellIndex
                  : rowIndex === 4 - cellIndex) &&
                line.numbers.includes(cell)))
        )}
        in:fly={{ delay: 250, duration: 250, easing: quintOut }}
      >
        {#if cell}
          <span>{cell}</span>
        {/if}
      </div>
    {/each}
  {/each}
</div>

<style>
  .highlighted {
    background-color: red !important;
    color: white !important;
  }
</style>
