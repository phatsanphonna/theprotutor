<script lang="ts">
  import StudentCard from "$lib/components/StudentCard.svelte";
  import NavigationBar from "$lib/components/dashboard/NavigationBar.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <div class="w-4/5 mx-auto">
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl md:text-4xl">
        👋🏻 สวัสดีตอนเย็น น้อง{data.user?.nickname}
      </h2>

      <StudentCard user={data.user} />

      <NavigationBar />
    </div>
    <slot />
  </div>
</div>
