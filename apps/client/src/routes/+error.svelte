<script>
  import { page } from "$app/stores";
  import AuthButton from "$lib/components/AuthButton.svelte";
</script>

<div
  class="container mx-auto h-full px-4 md:px-0 py-8 flex flex-col justify-center items-center gap-4 font-sans"
>
  <div class="text-center">
    <h1 class="font-bold text-8xl">{$page.status}</h1>
    <p class="text-2xl">{$page.error?.message}</p>
  </div>

  <hr class="!border-t-2 w-3/5">
  <span>Back to <a class="anchor" href="/dashboard/assignments">dashboard</a>.</span>
</div>
