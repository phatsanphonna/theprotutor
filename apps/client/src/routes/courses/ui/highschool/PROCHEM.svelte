<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const coursePrice = [
    {
      grade: 4,
      price: 1400,
    },
    {
      grade: 5,
      price: 1500,
    },
  ];
</script>

<CourseCard title="PRO CHEM">
  <svelte:fragment slot="grade">
    <ul class="flex flex-col">
      {#each coursePrice as { grade }}
        <li class="pl-2">- มัธยมศึกษาปีที่ {grade}</li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <p>เคมี</p>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <p>เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)</p>
  </svelte:fragment>

  <svelte:fragment slot="price">
    <ul class="flex flex-col">
      {#each coursePrice as { price, grade }}
        <li class="flex justify-between">
          <p>มัธยมศึกษาปีที่ {grade}</p>
          <p class="font-medium">{price.toLocaleString()} บาท/เดือน</p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>
</CourseCard>
