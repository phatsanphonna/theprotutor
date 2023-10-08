<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import Header from "$lib/components/Header.svelte";

  const times = [
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const toastStore = getToastStore();

  export let data: PageData;

  let isLoading = false;
  let validAppointment = false;
  let message = "";
  let messageType: "variant-soft-error" | "variant-soft-success" =
    "variant-soft-success";

  let appointmentDate = "";
  let startTime = "15:30";
  let totalHours = 1;

  const setUnvalidAppointment = () => {
    validAppointment = false;
    message = "";
  };

  const checkValidAppointment = async () => {
    validAppointment = false;
    isLoading = true;

    try {
      const { success, payload } = await trpc(
        $page,
      ).appointment.checkValidAppointment.query({
        appointmentTime: `${appointmentDate} ${startTime}`,
        endTime: totalHours,
      });

      if (!success) {
        messageType = "variant-soft-error";
        message = "ไม่สามารถนัดเรียนชดเชยได้ในวันนี้";
        return;
      }

      if (!payload) {
        messageType = "variant-soft-error";
        message = "เวลาที่คุณเลือกมานั้นได้มีคนจองไปแล้ว โปรดเลือกเวลาอื่น";
      }

      validAppointment = true;
    } catch (err: any) {
      console.error(err);

      toastStore.trigger({
        background: "variant-filled-error",
        message: "เกิดข้อผิดพลาดทางระบบ โปรดติดต่อเจ้าหน้าที่",
        autohide: true,
      });
    } finally {
      isLoading = false;
    }
  };

  const submitAppointment = async () => {
    await checkValidAppointment();

    if (validAppointment) {
      try {
        await trpc($page).appointment.createAppointment.mutate({
          appointmentTime: `${appointmentDate} ${startTime}`,
          endTime: totalHours,
        });

        toastStore.trigger({
          background: "variant-filled-success",
          message: `จองเรียนชดเชยสำเร็จ`,
        });
        goto("/appointments");
      } catch (err: any) {
        toastStore.trigger({
          background: "variant-filled-error",
          message: err.message,
        });
      } finally {
        isLoading = false;
      }
    }
  };
</script>

<svelte:head>
  <title>เรียนชดเชย | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Header>นัดเรียนชดเชย</Header>

  <section class="mb-4">
    <h4 class="text-2xl font-medium">คำแนะนำ</h4>
    <p>
      โปรดตรวจสอบข้อมูลเบื้องต้นของท่านให้เรียบร้อย
      หากข้อมูลเบื้องต้นนั้นไม่ถูกต้อง โปรดแจ้งเจ้าหน้าที่เพื่อทำการแก้ไข
    </p>
  </section>

  <hr class="!border-t-2 mb-4" />

  {#if message}
    <aside class={`alert mb-4 ${messageType}`}>
      <div class="alert-message">
        <p>{message}</p>
      </div>
    </aside>
  {/if}

  <form
    class="flex flex-col gap-2"
    on:submit|preventDefault={submitAppointment}
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <label class="label">
        <span>ชื่อจริง</span>
        <input
          class="input px-4 py-2"
          type="text"
          placeholder="ชื่อจริง"
          value={data.student?.firstname}
          readonly
          required
        />
      </label>

      <label class="label">
        <span>นามสกุล</span>
        <input
          class="input px-4 py-2"
          type="text"
          placeholder="นามสกุล"
          value={data.student?.lastname}
          readonly
          required
        />
      </label>

      <label class="label">
        <span>ชื่อเล่น</span>
        <input
          class="input px-4 py-2"
          type="text"
          placeholder="ชื่อเล่น"
          value={data.student?.nickname}
          readonly
          required
        />
      </label>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <label class="label">
        <span
          >วันที่ต้องการจองเรียนชดเชย<span class="text-red-500">*</span></span
        >
        <input
          class="input px-4 py-2"
          type="date"
          bind:value={appointmentDate}
          required
          on:change={setUnvalidAppointment}
          placeholder="วันที่ต้องการจองเรียนชดเชย"
        />
      </label>

      <div class="grid grid-cols-2 gap-2">
        <label class="label">
          <span>เวลาเริ่มต้น<span class="text-red-500">*</span></span>
          <select
            class="select"
            required
            bind:value={startTime}
            on:change={setUnvalidAppointment}
          >
            {#each times as time}
              <option value={time}>{time}</option>
            {/each}
          </select>
        </label>

        <label class="label">
          <span>จำนวนชั่วโมง<span class="text-red-500">*</span></span>
          <select
            class="select"
            required
            bind:value={totalHours}
            on:change={setUnvalidAppointment}
          >
            <option value={1}>1 ชั่วโมง</option>
            <option value={2}>2 ชั่วโมง</option>
            <option value={3}>3 ชั่วโมง</option>
          </select>
        </label>
      </div>
    </div>

    <Button class="variant-filled-primary" {isLoading} type="submit">
      นัดเรียนชดเชย
    </Button>
  </form>
</div>
