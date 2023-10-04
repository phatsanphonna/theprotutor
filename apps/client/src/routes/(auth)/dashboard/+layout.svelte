<script lang="ts">
  import StudentCard from "$lib/components/StudentCard.svelte";
  import NavigationBar from "$lib/components/dashboard/NavigationBar.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  const time = (() => {
    const date = new Date();

    if (date.getHours() >= 4 && date.getHours() < 7) {
      return "เช้ามืด";
    } else if (date.getHours() >= 7 && date.getHours() < 9) {
      return "เช้า";
    } else if (date.getHours() >= 9 && date.getHours() < 12) {
      return "สาย";
    } else if (date.getHours() >= 12 && date.getHours() < 13) {
      return "เที่ยง";
    } else if (date.getHours() >= 13 && date.getHours() < 17) {
      return "บ่าย";
    } else if (date.getHours() >= 17 && date.getHours() < 19) {
      return "เย็น";
    } else {
      return "ค่ำ";
    }
  })();
</script>

<svelte:head>
  <title>Dashboard | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <div class="w-4/5 mx-auto">
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl md:text-4xl">
        👋🏻 สวัสดีตอน{time} น้อง{data.user?.nickname}
      </h2>

      <StudentCard user={data.user} />
      <NavigationBar />
    </div>
    <slot />
  </div>
</div>
