<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const courseTime = [
    {
      subject: "คณิตศาสตร์",
      time: "5-6 ชั่วโมง/สัปดาห์",
    },
    {
      subject: "ภาษาอังกฤษ",
      time: "3 ชั่วโมง (1 วัน/สัปดาห์)",
    },
  ];

  const courseGrade = 5;
  const coursePrice = 2499;
  const perSubjectPrice = 1300;
</script>

<CourseCard title="PRO KIDS 2">
  <svelte:fragment slot="grade">
    <p>ประถมศึกษาปีที่ {courseGrade}</p>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <ul>
      <li>คณิตศาสตร์</li>
      <li>ภาษาอังกฤษ</li>
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <ul class="flex flex-col">
      <p>เลือกเรียน 1-2 วัน/สัปดาห์</p>

      {#each courseTime as { subject, time }}
        <li>
          <div class="flex flex-col md:flex-row md:justify-between">
            <p class="pl-2">- {subject}</p>
            <p>{time}</p>
          </div>
          {#if subject === "คณิตศาสตร์"}
            <p class="text-sm pl-2">
              (สามารถแบ่งชั่วโมงเรียนได้ 1 หรือ 2 วัน/สัปดาห์)
            </p>
          {/if}
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
</CourseCard>
