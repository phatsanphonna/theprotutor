<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const coursePrice = [
    {
      grade: 4,
      price: 1450,
    },
    {
      grade: 5,
      price: 1550,
    },
  ];
</script>

<CourseCard title="PRO MATH BY KPPM">
  <svelte:fragment slot="grade">
    <ul class="flex flex-col">
      {#each coursePrice as { grade }}
        <li class="pl-2">- มัธยมศึกษาปีที่ {grade}</li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <p>คณิตศาสตร์</p>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <p>เรียน 2 วัน/สัปดาห์ (ไม่จำกัดชั่วโมงเรียน)</p>
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
