<script lang="ts">
  import { page } from "$app/stores";
  const { data } = $page;
</script>

<div class="h-80 overflow-hidden header-overlay">
  <div class="container mx-auto flex flex-col justify-center p-4 h-full gap-8">
    <div class="flex flex-col justify-center">
      <h1 class="text-4xl md:text-6xl font-bold text-white">THE PRO TUTOR</h1>
      <p class="text-white md:text-2xl">สถาบันกวดวิชาเดอะโปรติวเตอร์</p>
    </div>

    <div>
      <a
        href="https://lin.ee/BdFh3Km"
        target="_blank"
        rel="noreferrer"
        class="btn variant-filled-primary">สมัครเรียน</a
      >
      {#if data.student}
        <a href="/dashboard/assignments" class="btn variant-filled"
          >ไปที่แดชบอร์ด</a
        >
      {:else if data.user}
        <a href="/register" class="btn variant-filled">สร้างโปรไฟล์</a>
      {/if}
    </div>
  </div>
</div>

<style>
  .header-overlay {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.8) 100%
      ),
      url("/pictures/thepro1.jpeg");
    background-size: cover;
  }
</style>
