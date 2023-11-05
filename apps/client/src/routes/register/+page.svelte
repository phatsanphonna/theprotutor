<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Header from "$lib/components/Header.svelte";
  import { trpc } from "$lib/trpc/client";
  import { getToastStore } from "@skeletonlabs/skeleton";

  const toastStore = getToastStore();

  let firstname = "";
  let lastname = "";
  let nickname = "";
  let telephoneNumber = "";
  let guardianTelephoneNumber = "";

  let busy = false;

  const submitForm = async () => {
    busy = true;

    try {
      const { success } = await trpc($page).me.createStudent.mutate({
        firstname,
        lastname,
        nickname,
        telephoneNumber,
        guardianTelephoneNumber,
      });

      if (success) {
        toastStore.trigger({
          message: "สมัครสมาชิกสำเร็จ",
          autohide: true,
          background: "variant-filled-success",
        });

        goto("/dashboard/assignments");
      }
    } catch (error: any) {
      console.error(error);

      toastStore.trigger({
        message: "เกิดความผิดพลาดทางระบบ โปรดติดต่อเจ้าหน้าที่",
        background: "variant-filled-error",
        autohide: true,
      });
    } finally {
      busy = false;
    }
  };
</script>

<svelte:head>
  <title>สมัครสมาชิก | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Header>ยินดีต้อนรับสู่เดอะโปรติวเตอร์</Header>
  <p class="mb-4">
    ก่อนที่จะสามารถใช้งานได้ โปรดกรอกข้อมูลเบื้องต้นให้เรียบร้อย
  </p>

  <hr class="!border-t-2 mb-4" />

  <form
    class="flex flex-col gap-2 w-full"
    on:submit|preventDefault={submitForm}
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <label class="label">
        <span>ชื่อจริง<span class="text-red-500">*</span></span>
        <input
          class="input px-4 py-2"
          type="text"
          placeholder="อีลอน"
          bind:value={firstname}
          required
        />
      </label>

      <label class="label">
        <span>นามสกุล<span class="text-red-500">*</span></span>
        <input
          class="input px-4 py-2"
          type="text"
          placeholder="มัสก์"
          bind:value={lastname}
          required
        />
      </label>

      <label class="label">
        <span>ชื่อเล่น<span class="text-red-500">*</span></span>
        <input
          class="input px-4 py-2"
          type="text"
          placeholder="อีหลงหม่า"
          bind:value={nickname}
          required
        />
      </label>
    </div>

    <label class="label">
      <span>อีเมล<span class="text-red-500">*</span></span>
      <input
        class="input px-4 py-2"
        type="email"
        placeholder="elonmusk@spacex.com"
        value={$page.data.session?.user?.email}
        required
        readonly
      />
    </label>

    <div class="grid grid-cols-2 gap-2">
      <label class="label">
        <span>เบอร์โทรศัพท์<span class="text-red-500">*</span></span>
        <input
          class="input px-4 py-2"
          type="tel"
          pattern="[0-9]{10}"
          placeholder="0987654321"
          bind:value={telephoneNumber}
          required
        />
      </label>

      <label class="label">
        <span>เบอร์โทรศัพท์ผู้ปกครอง<span class="text-red-500">*</span></span>
        <input
          class="input px-4 py-2"
          type="tel"
          pattern="[0-9]{10}"
          placeholder="0987654321"
          bind:value={guardianTelephoneNumber}
          required
        />
      </label>
    </div>

    <hr class="!border-t-2 my-4" />

    <p>
      การดำเนินการต่อเพื่อทำการสมัครสมาชิก หมายความว่าคุณได้ยอมรับ<a
        class="anchor"
        href="/privacy-policy">นโยบายความเป็นส่วนตัว</a
      >ของทางเว็บไซต์
    </p>

    <Button type="submit" class="variant-filled-primary" isLoading={busy}>
      สมัครสมาชิก
    </Button>
  </form>
</div>
