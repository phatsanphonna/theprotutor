<script lang="ts">
  const courses = ["TGAT", "A-Level", "คณิตศาสตร์", "วิทยาศาสตร์", "ภาษาอังกฤษ"];
</script>

<div class="mt-2 container mx-auto flex flex-col p-4">
  <!-- <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h3 class="font-bold text-2xl md:text-4xl">TCAS 67</h3>
      <a href="/courses" class="btn variant-ghost-primary btn-sm">
        <span>ดูเพิ่มเติม</span>
        <span><IconChevronRight /></span>
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      {#each TCASInfo as info}
        <HomeCourseCard {...info} />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h3 class="font-bold text-2xl md:text-4xl">คอร์สเรียนมัธยมต้น</h3>
      <a href="/courses" class="btn variant-ghost-primary btn-sm">
        <span>ดูเพิ่มเติม</span>
        <span><IconChevronRight /></span>
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      {#each secondaryInfo as info}
        <HomeCourseCard {...info} />
      {/each}
    </div>
  </div> -->

  <h2 class="text-4xl mb-4 text-center font-medium">วิชาที่เปิดสอน</h2>

  <div class="flex gap-2 flex-col md:flex-row justify-center">
    {#each courses as c}
      <a
        href="/courses"
        class="card-hover h-20 md:h-20 md:w-60 bg-primary-500 grid place-items-center rounded"
      >
        <p class="font-medium text-lg">{c}</p>
      </a>
    {/each}
  </div>
</div>
