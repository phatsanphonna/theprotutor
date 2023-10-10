<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import { IconTestPipe, IconTestPipe2 } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import ScoreCard from "./ui/ScoreCard.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title
    >รายงานคะแนนสอบของ {data.ownScore?.scoreboard.name} | สถาบันกวดวิชาเดอะโปร -
    THE PRO TUTOR</title
  >
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Header>
    <IconTestPipe class="inline-block" size={32} /> รายงานคะแนนสอบ
  </Header>

  <div class="mb-4">
    <ul class="list text-lg">
      <li class="flex">
        <span class="font-medium">ชื่อแบบทดสอบ:</span>
        <span class="flex-auto">
          {data.ownScore?.scoreboard.name}
        </span>
      </li>

      <li class="flex">
        <span class="font-medium">วันที่สอบ:</span>
        <span class="flex-auto">
          {new Intl.DateTimeFormat("th-TH").format(
            new Date(String(data.ownScore?.scoreboard.timestamp)),
          )}
        </span>
      </li>

      <li class="flex">
        <span class="font-medium">รหัสนักเรียน:</span>
        <span class="flex-auto">
          {data.ownScore?.student.studentId}
        </span>
      </li>

      <li class="flex">
        <span class="font-medium">ชื่อ-นามสกุล:</span>
        <span class="flex-auto">
          {data.ownScore?.student.firstname}
          {data.ownScore?.student.lastname} ({data.ownScore?.student.nickname})
        </span>
      </li>
    </ul>
  </div>

  <div class="grid grid-cols-1 gap-4 mb-4">
    <div class="grid grid-cols-2 gap-4">
      <ScoreCard
        name="คะแนนของคุณ"
        variant="variant-filled-primary"
        score={Number(data.ownScore?.score)}
      />
      <ScoreCard
        name="คะแนนเต็ม"
        variant="variant-ghost-success"
        score={Number(data.ownScore?.scoreboard.total)}
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <ScoreCard
        name="ค่าเฉลี่ย"
        score={Number(data.ownScore?.scoreboard.mean)}
      />
      <ScoreCard
        name="ส่วนเบี่ยงเบนมาตรฐาน"
        score={Number(data.ownScore?.scoreboard.sd)}
      />
      <ScoreCard
        name="คะแนนต่ำสุด"
        score={Number(data.ownScore?.scoreboard.min)}
      />
      <ScoreCard
        name="คะแนนสูงสุด"
        score={Number(data.ownScore?.scoreboard.max)}
      />
    </div>
  </div>

  <hr class="!border-t-2 mb-4" />

  <div class="table-container">
    <table class="table table-compact">
      <thead>
        <tr>
          <th>ลำดับ</th>
          <th>รหัสนักเรียน</th>
          <th>ชื่อ-นามสกุล</th>
          <th>คะแนน</th>
        </tr>
      </thead>
      <tbody>
        {#each data.ownScore?.scoreboard.scores || [] as score, i}
          {#if score.student.id === data.ownScore?.student.id}
            <tr class="variant-ghost-primary">
              <td>{i + 1}</td>
              <td>{score.student.studentId}</td>
              <td
                >{score.student.firstname}
                {score.student.lastname} ({score.student.nickname})</td
              >
              <td>{score.score} / {data.ownScore?.scoreboard.total}</td>
            </tr>
          {:else}
            <tr>
              <td>{i + 1}</td>
              <td>{score.student.studentId}</td>
              <td
                >{score.student.firstname}
                {score.student.lastname} ({score.student.nickname})</td
              >
              <td>{score.score} / {data.ownScore?.scoreboard.total}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>
