<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";

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
  let startTime = "";
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
        $page
      ).appointment.checkValidAppointment.query({
        appointmentTime: `${appointmentDate} ${startTime}`,
        endTime: totalHours,
      });

      if (!success) {
        messageType = "variant-soft-error";
        message = "ไม่สามารถนัดเรียนชดเชยได้ในวันนี้";
        return;
      }

      if (payload) {
        validAppointment = true;
        messageType = "variant-soft-success";
        message =
          "เวลาที่คุณเลือกมานั้นสามารถนัดเรียนชดเชยได้ โปรดตรวจสอบข้อมูลให้เรียบร้อยก่อนทำการนัดเรียนชดเชย";
      } else {
        messageType = "variant-soft-error";
        message = "เวลาที่คุณเลือกมานั้นได้มีคนจองไปแล้ว โปรดเลือกเวลาอื่น";
      }
    } catch (err: any) {
      toastStore.trigger({
        background: "variant-filled-error",
        message: err.message,
      });
    } finally {
      isLoading = false;
    }
  };

  const submitAppointment = async () => {
    isLoading = true;
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
  };
</script>

<svelte:head>
  <title>เรียนชดเชย | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <h2 class="font-bold text-4xl md:text-6xl mb-4">นัดเรียนชดเชย</h2>

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
          value={data.user?.firstname}
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
          value={data.user?.lastname}
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
          value={data.user?.nickname}
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

    <div class="grid grid-cols-2 gap-2">
      <Button
        class="variant-filled-surface"
        on:click={checkValidAppointment}
        {isLoading}>ตรวจสอบข้อมูล</Button
      >

      <Button
        class="variant-filled-primary"
        {isLoading}
        type="submit"
        disabled={!validAppointment}>นัดเรียนชดเชย</Button
      >
    </div>
  </form>
</div>
