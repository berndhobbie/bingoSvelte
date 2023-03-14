<script lang="ts">
  export let bingoCard;
</script>

<div class="grid grid-cols-5 grid-rows-1 w-80">
  {#each bingoCard.card as letter}
    {#each letter.name as header}
      <div
        class="flex justify-center items-center border border-black p-2 bg-blue-900 text-white text-4xl font-extrabold h-16 w-16"
      >
        {#if header}
          {header}
        {/if}
      </div>
    {/each}
  {/each}
</div>
