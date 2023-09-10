<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const courseTime = [
    {
      id: "A",
      day: "เลือกได้ 2 วัน (จันทร์ - ศุกร์)",
      time: "วันละ 2 ชั่วโมง (2 วัน/สัปดาห์)",
    },
    {
      id: "B",
      day: "วันเสาร์ (เช้า)",
      time: "วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)",
    },
    {
      id: "C",
      day: "วันเสาร์ (บ่าย)",
      time: "วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)",
    },
    {
      id: "D",
      day: "วันอาทิตย์ (เช้า)",
      time: "วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)",
    },
    {
      id: "E",
      day: "วันอาทิตย์ (บ่าย)",
      time: "วันละ 4 ชั่วโมง (1 วัน/สัปดาห์)",
    },
  ];

  const courseGrade = [
    {
      grade: 1,
    },
    {
      grade: 2,
    },
    {
      grade: 3,
    },
    {
      grade: 4,
    },
  ];

  const coursePrice = 1200;
</script>

<CourseCard title="PRO KIDS 1">
  <svelte:fragment slot="grade">
    <ul class="flex flex-col gap-1">
      {#each courseGrade as { grade }}
        <li class="pl-2">- ประถมศึกษาปีที่ {grade}</li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <p>เลือกได้มากที่สุด 2 วิชา/คอร์ส</p>

    <ul>
      <li class="pl-2">- คณิตศาสตร์</li>
      <li class="pl-2">- ภาษาอังกฤษ</li>
      <li class="pl-2">- ภาษาไทย</li>
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <ul class="flex flex-col">
      {#each courseTime as { id, day, time }}
        <li class="flex flex-col md:flex-row md:justify-between">
          <p class="pl-2">
            <span class="font-medium">- คอร์ส {id}: </span>
            {day}
          </p>
          <p>{time}</p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="price">
    <p class="font-medium">{coursePrice.toLocaleString()} บาท/เดือน</p>
  </svelte:fragment>

  <svelte:fragment slot="remarks">
    <span class="text-sm font-medium italic">*สามารถนัดเวลาเรียนได้</span>
  </svelte:fragment>
</CourseCard>
