<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const courseSubject = [
    {
      subject: "คณิตศาสตร์",
      time: "เรียนวันละ 3-4 ชั่วโมง",
    },
    {
      subject: "วิทยาศาสตร์",
      time: "เรียนวันละ 3 ชั่วโมง",
    },
    {
      subject: "ภาษาอังกฤษ",
      time: "เรียนวันละ 3 ชั่วโมง",
    },
    {
      subject: "มิติสัมพันธ์และการคิดแบบมีเหตุผล",
      time: "เรียนวันละ 3 ชั่วโมง",
    },
    {
      subject: "ภาษาไทยและสังคมศึกษา",
      time: "เรียนวันละ 3 ชั่วโมง",
    },
  ];

  const courseGrade = 6;
  const coursePrice = 3499;
  const perSubjectPrice = 1000;
</script>

<CourseCard
  title="PRE PRO 3"
  description="คอร์สทบทวนเนื้อหาและตะลุยโจทย์ข้อสอบเก่า"
>
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
        <li class="flex flex-col md:flex-row md:justify-between">
          <p class="pl-2">- {subject}</p>
          <p>{time}</p>
        </li>
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
      >*เรียนรวมทั้ง 6 วิชา ตามตารางเรียนแต่ละสัปดาห์</span
    >
    <span class="text-sm font-medium italic"
      >*อาจมีการเพิ่มวันเรียน โดยไม่เสียค่าใช้จ่ายเพิ่ม</span
    >
    <span class="text-sm font-medium italic"
      >*สำหรับวิชาคณิตศาสตร์ อาจจะมีการเรียนเกินเวลา ตามศักยภาพของผู้เรียน</span
    >
  </svelte:fragment>
</CourseCard>
