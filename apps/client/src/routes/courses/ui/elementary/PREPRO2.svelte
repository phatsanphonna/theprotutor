<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const courseSubject = [
    {
      id: "A",
      subject: "ฟิสิกส์, เคมี, ชีววิทยา (พื้นฐาน)",
      time: "เรียน 1 วัน/สัปดาห์, วันละ 3 ชั่วโมง",
    },
    {
      id: "B",
      subject: "คณิตศาสตร์ประยุกต์",
      time: "เรียน 1 วัน/สัปดาห์, วันละ 3 ชั่วโมง",
    },
  ];

  const courseGrade = 6;
  const coursePrice = 1499;
</script>

<CourseCard
  title="PRE PRO 2"
  description="คอร์สติวสอบเข้าโครงการพิเศษ, Gifted, โรงเรียนสาธิตชื่อดัง"
>
  <svelte:fragment slot="grade">
    <p>ประถมศึกษาปีที่ {courseGrade}</p>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <p>เรียน 2-3 วัน/สัปดาห์ ตามตารางเรียน</p>
    <ul>
      {#each courseSubject as { id, subject }}
        <li class="flex flex-col md:justify-between">
          <p class="pl-2">
            <span class="font-medium">- แผน {id}: </span>{subject}
          </p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <ul class="flex flex-col">
      {#each courseSubject as { id, subject, time }}
        <li class="flex flex-col md:justify-between">
          <p class="pl-2">
            <span class="font-medium">- แผน {id}: </span>{subject}
          </p>
          <p class="pl-2">{time}</p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="price">
    <ul class="flex flex-col">
      <li>
        แผนละ <span class="font-medium"
          >{coursePrice.toLocaleString()} บาท/เดือน
        </span>
      </li>
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="remarks">
    <span class="text-sm font-medium italic"
      >*สามารถซื้อคอร์สเพิ่ม เพื่อเพิ่มชั่วโมงเรียนได้ตามต้องการ</span
    >
  </svelte:fragment>
</CourseCard>
