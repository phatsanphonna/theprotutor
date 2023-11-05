<script lang="ts">
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import { trpc } from "$lib/trpc/client";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";

  $: isLoading = false;
  export let data: PageData;
  const { assignment } = data;
  $: src = assignment.lesson.materials[0].id;

  let passcode = "";
  $: passcode = passcode.replace(/[^0-9]/g, "");
  $: isVerified = false;

  const verifyPasscode = async () => {
    isLoading = true;
    const { payload } = await trpc($page).me.verifyPasscode.mutate(passcode);
    isVerified = payload;
    isLoading = false;
  };
</script>

<svelte:head>
  <title>{assignment.lesson.title} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
  >
</svelte:head>

{#if !isVerified}
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-2">
      <VideoPlayer
        class="w-full aspect-video"
        {src}
        title={assignment.lesson.title}
      />

      <div class="card variant-ghost w-full md:w-2/5">
        <header class="card-header">
          <h2 class="h2 font-bold">ไฟล์ที่เกี่ยวข้อง</h2>
        </header>

        <section class="p-4 h-full w-full">
          <ListBox>
            <ListBoxItem bind:group={src} name="medium" value="Tuhi5rSr3WBo"
              >Tuhi5rSr3WBo</ListBoxItem
            >
            <ListBoxItem bind:group={src} name="medium" value="Tuhi5srYISKn"
              >Tuhi5srYISKn</ListBoxItem
            >
            <ListBoxItem bind:group={src} name="medium" value="Tuhi5s887OUC"
              >Tuhi5s887OUC</ListBoxItem
            >
            <ListBoxItem bind:group={src} name="medium" value="Tuhi5qbV2l3m"
              >Tuhi5qbV2l3m</ListBoxItem
            >
          </ListBox>
        </section>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="h2 font-medium">{assignment.lesson.title}</h1>
      <p>
        สอนโดย {assignment.lesson.teacher.firstname}
        {assignment.lesson.teacher.lastname}
      </p>
      <hr class="!border-t-2 my-4" />

      <p class="text-xl">{assignment.lesson.description}</p>
    </div>
  </div>
{:else}
  <div
    class="container md:w-2/5 mx-auto px-4 py-8 text-center flex flex-col gap-4 h-full justify-center"
  >
    <div>
      <h1 class="h1 text-6xl font-bold">ยืนยันตัวตน</h1>

      <p class="text-gray-500">กรุณากรอกรหัสผ่านเพื่อเข้าถึงบทเรียน</p>
    </div>

    <input
      type="text"
      class="input px-4 py-2"
      bind:value={passcode}
      maxlength="4"
      placeholder="ตัวเลข 4 ตัว"
    />

    <Button
      class="btn variant-filled-primary"
      {isLoading}
      on:click={verifyPasscode}>ยืนยันตัวตน</Button
    >
  </div>
{/if}
