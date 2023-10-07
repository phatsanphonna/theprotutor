<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const courseGrade = 6;
  const coursePrice = 1800;
  const subjects = [
    {
      subject: "TGAT 1",
      contents: [
        "ทักษะการพูด ทักษะการอ่าน",
        "ปูพื้นฐานแกรมม่า เพื่อเสริมความมั่นใจ",
      ],
      price: 1300,
      time: "2 ชั่วโมง",
    },
    {
      subject: "TGAT 2 & TGAT 3",
      contents: [
        "ความสามารถทางภาษา",
        "ความสามารถทางตัวเลข",
        "ความสามารถทางมิติสัมพันธ์",
        "ความสามารถทางเหตุผล",
        "การสร้างคุณค่าและนวัตกรรม",
        "การแก้ไขปัญหาที่ซับซ้อน",
        "การบริหารจัดการอารมณ์",
        "การเป็นพลเมืองที่มีส่วนรวมทางสังคม",
      ],
      price: 1000,
      time: "2 ชั่วโมง",
    },
  ];
</script>

<CourseCard title="PRO TGAT">
  <svelte:fragment slot="grade">
    <p>มัธยมศึกษาปีที่ {courseGrade}</p>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <ul class="flex flex-col">
      {#each subjects as { subject, contents }}
        <li>
          <p>{subject}</p>
          <ul>
            {#each contents as c}
              <li class="pl-2">- {c}</li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <ul class="flex flex-col">
      <li>เรียน 1 วันต่อสัปดาห์ วันละ 4 ชั่วโมง โดยแบ่งเป็น</li>
      {#each subjects as { subject, time }}
        <li class="flex justify-between">
          <p class="pl-2">- {subject}</p>
          <p class="font-medium">{time}</p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="price">
    <ul class="flex flex-col">
      <li>
        <span class="font-medium">{coursePrice.toLocaleString()} บาท/เดือน</span
        >
        โดยสามารถลงแยกได้วิชาละ
      </li>
      {#each subjects as { price, subject }}
        <li class="flex justify-between">
          <p class="pl-2">- {subject}</p>
          <p class="font-medium">{price.toLocaleString()} บาท/เดือน</p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>
</CourseCard>
