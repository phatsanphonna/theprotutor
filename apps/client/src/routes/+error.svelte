<script>
  import { page } from "$app/stores";
  import AuthButton from "$lib/components/AuthButton.svelte";
</script>

<div
  class="container mx-auto px-4 md:px-0 py-8 min-h-screen flex flex-col justify-center items-center gap-4"
>
  <div class="text-center">
    <h1 class="h1 font-bold">{$page.status}</h1>
    <p class="text-lg">{$page.error?.message}</p>
  </div>
</div>
