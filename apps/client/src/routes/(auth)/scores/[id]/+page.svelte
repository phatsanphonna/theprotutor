<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title
    >{data.score?.scoreboard.name} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
  >
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <Header>{data.score?.scoreboard.name}</Header>
</div>
