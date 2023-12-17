<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import { trpc } from "$lib/trpc/client";
  import { ListBox, ListBoxItem, getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  const toastStore = getToastStore();

  $: isLoading = false;
  export let data: PageData;
  const { assignment } = data;
  $: src = assignment.lesson.videos[0].key;

  let passcode = "";
  $: passcode = passcode.replace(/[^0-9]/g, "");
  $: isVerified = false;

  onMount(() => {
    const interval = setInterval(() => {
      if (
        assignment.expireDate &&
        new Date() > new Date(assignment.expireDate)
      ) {
        clearInterval(interval);
        toastStore.trigger({
          message: "Assignment นี้หมดอายุแล้ว",
          background: "variant-filled-error",
          autohide: true,
          timeout: 3000,
        });
        goto("/dashboard/assignments");
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const verifyPasscode = async () => {
    isLoading = true;
    const { payload } = await trpc($page).me.verifyPasscode.mutate(passcode);

    if (!payload) {
      toastStore.trigger({
        message: "รหัสผ่านไม่ถูกต้อง",
        background: "variant-filled-error",
        autohide: true,
        timeout: 3000,
      });
    }
    isVerified = payload;
    isLoading = false;
  };
</script>

<svelte:head>
  <title>{assignment.lesson.title} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
  >
</svelte:head>

{#if isVerified}
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
            {#each assignment.lesson.videos as { title, key }}
              <ListBoxItem bind:group={src} name="medium" value={key}
                >{title}</ListBoxItem
              >
            {/each}
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
  <form
    class="container md:w-2/5 mx-auto px-4 py-8 text-center flex flex-col gap-4 h-full justify-center"
    on:submit|preventDefault={verifyPasscode}
  >
    <div>
      <h1 class="h1 text-6xl font-bold">ยืนยันตัวตน</h1>

      <p class="text-gray-500">กรุณากรอกรหัสผ่านเพื่อเข้าถึงบทเรียน</p>
    </div>

    <input
      type="text"
      class="input px-4 py-2"
      required
      bind:value={passcode}
      disabled={isLoading}
      maxlength="4"
      placeholder="ตัวเลข 4 ตัว"
      inputmode="numeric"
    />

    <Button class="btn variant-filled-primary" {isLoading} type="submit"
      >ยืนยันตัวตน</Button
    >
  </form>
{/if}
