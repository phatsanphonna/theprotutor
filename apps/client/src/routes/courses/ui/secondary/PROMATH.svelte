<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const coursePrice = [
    {
      grade: 1,
      price: 1300,
    },
    {
      grade: 2,
      price: 1350,
    },
    {
      grade: 3,
      price: 1400,
    },
  ];
</script>

<CourseCard title="PRO MATH">
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
