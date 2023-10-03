<script lang="ts">
  import WorkCard from "$lib/components/dashboard/WorkCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="pt-4">
  <h2 class="font-bold text-4xl mb-4">บทเรียน</h2>
  {#each data.assignments as assignment}
    <WorkCard
      name={assignment.lesson.title}
      expireDate={assignment.expireDate}
      id={assignment.id}
      totalFiles={assignment.lesson.materials.length}
    />
  {/each}
</div>
