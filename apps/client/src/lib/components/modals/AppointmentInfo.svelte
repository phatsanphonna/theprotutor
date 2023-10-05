<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import { trpc } from "$lib/trpc/client";
  import { getModalStore, getToastStore } from "@skeletonlabs/skeleton";
  import { IconClock, IconLoader2 } from "@tabler/icons-svelte";
  import type { Student } from "database";
  import { onMount } from "svelte";

  interface InfoPayload {
    id: number;
    appointmentTime: string;
    endTime: string;
    studentId: string;
    createdAt: string;
    student: Student;
  }

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  const dateTimeFormatter = new Intl.DateTimeFormat("th-TH", {
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    year: "numeric",
  });

  let busy = false;
  let isLoading = false;
  let info: InfoPayload | null;
  let appointmentTime: Date;
  let endTime: Date;
  let createdAt: Date;

  $: formatAppointmentTime = dateTimeFormatter.format(appointmentTime);
  $: formatEndTime = dateTimeFormatter.format(endTime);
  $: formatCreatedAt = dateTimeFormatter.format(createdAt);

  const cancelAppointment = async () => {
    if (info) {
      isLoading = true;
      await trpc($page).appointment.deleteAppointmentById.mutate(info?.id);

      toastStore.trigger({
        background: "variant-filled-success",
        message: `ยกเลิกการจองสำเร็จ`,
      });

      isLoading = false;
      modalStore.close();
      window.location.reload();
    }
  };

  onMount(async () => {
    try {
      busy = true;
      const { value } = $modalStore[0];
      const id = Number(value.id);

      const { payload } = await trpc(
        $page
      ).appointment.getAppointmentById.query(id);
      info = payload;

      appointmentTime = new Date(String(payload?.appointmentTime));
      endTime = new Date(String(payload?.endTime));
      createdAt = new Date(String(payload?.createdAt));
    } catch (error: any) {
      toastStore.trigger({
        message: `${error.message}`,
        background: "variant-filled-error",
      });
    } finally {
      busy = false;
    }
  });
</script>

{#if $modalStore[0]}
  <div class="card p-4 flex flex-col gap-4">
    {#if busy}
      <div class="grid place-items-center">
        <IconLoader2 size={64} class="animate-spin" />
      </div>
    {:else}
      <p class="text-2xl">รายละเอียดการนัดเรียนชดเชย</p>

      <hr class="!border-t-2" />

      <div>
        <h4 class="font-medium text-xl">
          {info?.student.firstname}
          {info?.student.lastname}
        </h4>
        <div>
          <span class="flex gap-1 font-medium"
            >จองไว้เมื่อวันที่ <span class="text-left font-normal"
              >{formatCreatedAt}</span
            ></span
          >
        </div>
      </div>

      <ul>
        <li class="flex gap-2">
          <span class="flex gap-1 font-medium"><IconClock /> เวลานัด:</span>
          <span class="text-left">{formatAppointmentTime}</span>
        </li>
        <li class="flex flex-col md:flex-row md:gap-2">
          <span class="flex gap-1 font-medium"><IconClock /> เวลาสิ้นสุด:</span>
          <span class="text-left">{formatEndTime}</span>
        </li>
      </ul>

      {#if info?.studentId == $page.data.student?.id}
        <Button
          on:click={cancelAppointment}
          {isLoading}
          class="variant-ghost-warning"
        >
          ยกเลิกการจอง
        </Button>
      {/if}
    {/if}
  </div>
{/if}
