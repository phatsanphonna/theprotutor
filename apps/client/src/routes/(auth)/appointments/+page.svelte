<script lang="ts">
  import FullCalendar, {
    type CalendarOptions,
    type EventClickArg,
  } from "svelte-fullcalendar";
  import daygridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";

  export let data: PageData;

  const modalStore = getModalStore();

  const handleEventClick = (arg: EventClickArg) => {
    modalStore.trigger({
      type: "component",
      component: "appointmentInfo",
      value: {
        id: arg.event.id,
      },
    });
  };

  let options: CalendarOptions = {
    eventClick: handleEventClick,
    events: data.appointments.map(({ appointmentTime, student, id }) => ({
      date: appointmentTime,
      title: `${student.firstname} ${student.lastname}`,
      id: id + "",
      backgroundColor: "#86C556",
    })),
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
  <title>ตารางการนัดเรียนชดเชย | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Header>ตารางการนัดเรียนชดเชย</Header>

  <div class="flex flex-col gap-4">
    <div class="w-full md:w-1/10">
      <a
        href="/appointments/create"
        class="btn variant-filled-primary w-full md:w-auto"
      >
        นัดเรียนชดเชย
      </a>
    </div>

    <hr class="!border-t-2" />

    <div class="text-sm md:text-base">
      <FullCalendar {options} />
    </div>
  </div>
</div>
