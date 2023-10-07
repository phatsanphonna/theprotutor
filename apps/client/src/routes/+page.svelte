<script lang="ts">
  import { page } from "$app/stores";

  let greetingMessage = "";
</script>

<svelte:head>
  <title>สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="h-96 w-full grid place-items-center">
  <p>{greetingMessage}</p>
</div>
