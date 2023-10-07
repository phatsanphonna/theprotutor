<script lang="ts">
  import AppointmentCard from "../ui/AppointmentCard.svelte";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";

  const modalStore = getModalStore();

  export let data: PageData;
</script>

<div class="pt-4">
  <div class="mb-4">
    <h2 class="font-bold text-4xl">เรียนชดเชย</h2>
    {#if data.appointments.length !== 0}
      <p class="text-xl">
        คุณมีประวัติการจองการเรียนชดเชยอยู่ {data.appointments.length} ครั้ง ต้องการ<a
          class="anchor"
          href="/appointments/create">นัดเรียนชดเชยเพิ่มเติม</a
        >?
      </p>
    {:else}
      <p class="text-xl">
        คุณไม่มีประวัติการจองการเรียนชดเชย ต้องการ<a
          class="anchor"
          href="/appointments/create">นัดเรียนชดเชย</a
        >?
      </p>
    {/if}
  </div>

  {#if data.appointments}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each data.appointments as { appointmentTime, endTime, id }}
        <AppointmentCard
          {id}
          appointmentTime={new Date(appointmentTime)}
          endTime={new Date(endTime)}
        />
      {/each}
    </div>
  {/if}
</div>
