<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";

  const toastStore = getToastStore();

  export let data: PageData;
  let isLoading = false;

  let appointmentDate = "";
  let startTime = "";
  let totalHours = 1;

  const submitAppointment = async () => {
    isLoading = true;
    try {
      await trpc(
        $page
      ).appointment.createAppointment.mutate({
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
        <span>ชื่อจริง</span>
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
          placeholder="วันที่ต้องการจองเรียนชดเชย"
        />
      </label>

      <div class="grid grid-cols-2 gap-2">
        <label class="label">
          <span>เวลาเริ่มต้น<span class="text-red-500">*</span></span>
          <input
            class="input px-4 py-2"
            type="time"
            required
            bind:value={startTime}
            placeholder="เวลาเริ่มต้น"
          />
        </label>

        <label class="label">
          <span>จำนวนชั่วโมง<span class="text-red-500">*</span></span>
          <select class="select" bind:value={totalHours}>
            <option value={1}>1 ชั่วโมง</option>
            <option value={2}>2 ชั่วโมง</option>
            <option value={3}>3 ชั่วโมง</option>
          </select>
        </label>
      </div>
    </div>

    <div>สถานะ : ว่าง</div>
    <Button class="variant-filled-primary" {isLoading}>จองเรียนชดเชย</Button>
  </form>
</div>
