<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";

  let greetingMessage = '';

  const greeting = async () => {
    greetingMessage = await trpc($page).greeting.greet.query('Sun')
  };
</script>

<svelte:head>
  <title>สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="h-96 w-full grid place-items-center">
  <p>{greetingMessage}</p>
  <button class="btn variant-filled" on:click={greeting}>Greetings</button>
</div>
