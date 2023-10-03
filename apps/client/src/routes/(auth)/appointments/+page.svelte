<script lang="ts">
  import FullCalendar, { type CalendarOptions } from "svelte-fullcalendar";
  import daygridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";

  let options: CalendarOptions = {
    dateClick: (event) => alert("date click! " + event.dateStr),
    eventClick: ({ event }) => alert(event.title),
    events: [
      { title: "event 1", date: "2024-04-01",allDay: true },
      { title: "event 2", date: "2024-04-02" },
    ],
    plugins: [daygridPlugin, interactionPlugin],
    locale: {
      code: "th-TH",
    },
    initialView: "dayGridMonth",
    buttonText: {
      today: "วันนี้",
    },
  };
</script>

<svelte:head>
  <title>ตารางการเรียนชดเชย | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <h2 class="font-bold text-4xl md:text-6xl mb-4">ตารางการเรียนชดเชย</h2>

  <div class="flex flex-col gap-4">
    <a href="/appointments/create">
      <button class="btn variant-filled-primary">นัดเรียนชดเชย</button>
    </a>
    <hr class="!border-t-2" />

    <div class="text-sm md:text-base">
      <FullCalendar {options} />
    </div>
  </div>
</div>
