<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { IconClock } from "@tabler/icons-svelte";

  const modalStore = getModalStore();

  export let appointmentTime: Date;
  export let endTime: Date;
  export let id: number;

  const dateTimeFormatter = new Intl.DateTimeFormat("th-TH", {
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    year: "numeric",
  });

  $: formatAppointmentTime = dateTimeFormatter.format(appointmentTime);
  $: formatEndTime = dateTimeFormatter.format(endTime);

  const displayAppointment = () => {
    modalStore.trigger({
      type: "component",
      component: "appointmentInfo",
      value: {
        id: id + "",
      },
    });
  };
</script>

<button on:click={displayAppointment} class="w-full">
  <div class="card card-hover p-4 variant-ghost-primary">
    <ul>
      <li class="flex flex-col md:flex-row md:gap-2">
        <span class="flex gap-1 font-medium"><IconClock /> เวลานัด:</span>
        <span class="text-left">{formatAppointmentTime}</span>
      </li>
      <li class="flex flex-col md:flex-row md:gap-2">
        <span class="flex gap-1 font-medium"><IconClock /> เวลาสิ้นสุด:</span>
        <span class="text-left">{formatEndTime}</span>
      </li>
    </ul>
  </div>
</button>
