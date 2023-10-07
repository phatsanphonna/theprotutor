<script>
  import CourseCard from "$lib/components/CourseCard.svelte";

  const coursePrice = 1499;
  const courseGrade = 3;
</script>

<CourseCard title="ติวเตรียมเข้าม.4 (วิทยาศาสตร์)">
  <svelte:fragment slot="grade">
    <p>มัธยมศึกษาปีที่ {courseGrade}</p>
  </svelte:fragment>

  <svelte:fragment slot="subject">
    <p>คณิตศาสตร์</p>
  </svelte:fragment>

  <svelte:fragment slot="schedule">
    <p>เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)</p>
  </svelte:fragment>

  <svelte:fragment slot="price">
    <p class="font-medium">{coursePrice.toLocaleString()} บาท/เดือน</p>
  </svelte:fragment>
</CourseCard>
