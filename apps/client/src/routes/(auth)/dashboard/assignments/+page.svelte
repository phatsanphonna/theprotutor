<script lang="ts">
  import WorkCard from "../ui/WorkCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="pt-4">
  <h2 class="font-bold text-4xl mb-4">บทเรียน</h2>

  {#if data.assignments?.length !== 0}
    <div class="flex flex-col gap-2">
      {#each data.assignments as assignment}
        <WorkCard
          id={assignment.id}
          name={assignment.lesson.title}
          expireDate={assignment.expireDate}
          totalFiles={assignment.lesson.materials.length}
        />
      {/each}
    </div>
  {:else}
    <div class="w-full grid place-items-center">
      <span
        class="text-center font-medium text-2xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
      >
        ยินดีด้วย คุณไม่มีอะไรที่ต้องทำแล้ว!
      </span>
    </div>
  {/if}
</div>
