<script lang="ts">
  const ambiances = ["ambiance1.webp", "ambiance2.webp", "ambiance3.webp"];
</script>

<div class="container mx-auto p-4">
  <h2 class="mb-4 text-4xl text-center font-medium">บรรยากาศ</h2>

  <div class="flex flex-col md:flex-row gap-2 justify-center">
    {#each ambiances as a}
      <img
        src={`ambiance/${a}`}
        alt="ambiance"
        class="rounded w-96 h-52 object-cover"
        loading="lazy"
      />
    {/each}
  </div>
</div>
