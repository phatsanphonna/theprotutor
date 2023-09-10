<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const courseGrade = 6;
  const courseDescription =
    "ติวเนื้อหาสรุปอย่างเข้มข้น เทคนิคทางลัดกวาดคะแนน พร้อมตะลุยโจทย์หลักสูตรแนวใหม่ โจทย์สามัญข้อสอบเก่า";
  const subjects = [
    {
      subject: "PRO MATH TCAS",
      desc: "A-Level คณิตศาสตร์ประยุกต์ ",
      price: 1689,
    },
    {
      subject: "PRO ENG TCAS",
      desc: "A-LEVEL ภาษาอังกฤษ",
      price: 1619,
    },
    {
      subject: "PRO PHY TCAS",
      desc: "A-LEVEL ฟิสิกส์",
      price: 1595,
    },
    {
      subject: "PRO CHEM TCAS",
      desc: "A-LEVEL เคมี",
      price: 1565,
    },
    {
      subject: "PRO SCI TCAS",
      desc: "A-LEVEL วิทยาศาสตร์ประยุกต์ (สายศิลป์)",
      price: 1441,
    },
  ];
</script>

<CourseCard title="PRO TCAS" description={courseDescription}>
  <svelte:fragment slot="grade">
    <p>มัธยมศึกษาปีที่ {courseGrade}</p>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <ul class="flex flex-col">
      {#each subjects as { subject, desc }}
        <li>
          <p class="pl-2">- {subject}</p>
          <p class="pl-2 text-sm">{desc}</p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <ul class="flex flex-col">
      <li>วันและเวลาตามตารางของที่เรียน</li>
    </ul>
  </svelte:fragment>

  <svelte:fragment slot="price">
    <ul class="flex flex-col">
      {#each subjects as { price, subject }}
        <li class="flex justify-between">
          <p class="pl-2">- {subject}</p>
          <p class="font-medium">{price.toLocaleString()} บาท/เดือน</p>
        </li>
      {/each}
    </ul>
  </svelte:fragment>
</CourseCard>
