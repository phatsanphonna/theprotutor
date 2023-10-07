<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const courseSubject = [
    {
      subject: "คณิตศาสตร์",
      time: "เรียนสัปดาห์ละ 5-6 ชั่วโมง",
    },
    {
      subject: "ภาษาอังกฤษ",
      time: "เรียน 1 วัน วันละ 3 ชั่วโมง",
    },
  ];

  const courseGrade = 6;
  const coursePrice = 2499;
  const perSubjectPrice = 1300;
</script>

<CourseCard title="PRE PRO 1" description="คอร์สปรับพื้นฐาน">
  <svelte:fragment slot="grade">
    <p>ประถมศึกษาปีที่ {courseGrade}</p>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <p>เรียน 2-3 วัน/สัปดาห์ ตามตารางเรียน</p>
    <ul>
      {#each courseSubject as { subject }}
        <li class="pl-2">- {subject}</li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <ul class="flex flex-col">
      {#each courseSubject as { subject, time }}
        <div class="flex flex-col md:flex-row md:justify-between">
          <p class="pl-2">- {subject}</p>
          <p>{time}</p>
        </div>
        {#if subject === "คณิตศาสตร์"}
          <p class="text-sm pl-2">
            (สามารถแบ่งชั่วโมงเรียนได้ 1 หรือ 2 วัน/สัปดาห์)
          </p>
        {/if}
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="price">
    <ul class="flex flex-col">
      <li class="font-medium">
        {coursePrice.toLocaleString()} บาท/เดือน
      </li>
      <li>
        ลงแยกวิชาละ <span class="font-medium"
          >{perSubjectPrice.toLocaleString()} บาท/เดือน
        </span>
      </li>
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="remarks">
    <span class="text-sm font-medium italic"
      >*วิชาคณิตศาสตร์จะมีชั่วโมงเรียนไม่เท่ากัน ตามศักยภาพของผู้เรียน</span
    >
    <span class="text-sm font-medium italic"
      >*จะมีการทดสอบในทุกสัปดาห์และแจ้งคะแนนให้ผู้ปกครอง</span
    >
  </svelte:fragment>
</CourseCard>
