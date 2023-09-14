<script lang="ts">
  import {
    PREPRO1,
    PREPRO2,
    PREPRO3,
    PROKIDS1,
    PROKIDS2,
  } from "$lib/components/courses/elementary";
  import {
    PROBIO,
    PROCHEM,
    PROENGHIGH,
    PROMATHBYKPPM,
    PROPHY,
  } from "$lib/components/courses/highschool";
  import {
    M4ENG,
    M4MATH,
    M4SCI,
    PROENG,
    PROMATH,
    PROSCI,
  } from "$lib/components/courses/secondary";
  import { PROTCAS, PROTGAT } from "$lib/components/courses/tcas";
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";

  let tabSet: number = 0;
</script>

<svelte:head>
  <title>คอร์สเรียนทั้งหมด | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <h2 class="font-bold text-6xl mb-4">คอร์สเรียน</h2>

  <TabGroup
    active="variant-filled-primary"
    hover="hover:variant-soft-primary"
  >
    <Tab bind:group={tabSet} name="tab1" value={0}>ทั้งหมด</Tab>
    <Tab bind:group={tabSet} name="tab2" value={1}>ประถม</Tab>
    <Tab bind:group={tabSet} name="tab3" value={2}>มัธยมต้น</Tab>
    <Tab bind:group={tabSet} name="tab3" value={3}>มัธยมปลาย</Tab>

    <svelte:fragment slot="panel">
      <div class="flex flex-col gap-8">
        {#if tabSet === 1 || tabSet === 0}
          <div class="flex flex-col gap-4">
            <h3 class="font-bold text-4xl">PRO KIDS</h3>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PROKIDS1 />
              <PROKIDS2 />
            </div>
          </div>
        {/if}

        {#if tabSet === 1 || tabSet === 0}
          <div class="flex flex-col gap-4">
            <h3 class="font-bold text-4xl">PRE PRO</h3>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <PREPRO1 />
              <PREPRO2 />
              <PREPRO3 />
            </div>
          </div>

          <hr />
        {/if}

        {#if tabSet === 2 || tabSet === 0}
          <div class="flex flex-col gap-4">
            <h3 class="font-bold text-4xl">PRO TEEN</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PROMATH />
              <PROSCI />
              <PROENG />
              <M4MATH />
              <M4SCI />
              <M4ENG />
            </div>
          </div>

          <hr />
        {/if}

        {#if tabSet === 3 || tabSet === 0}
          <div class="flex flex-col gap-4">
            <h3 class="font-bold text-4xl">PRO HIGH</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PROMATHBYKPPM />
              <PROPHY />
              <PROCHEM />
              <PROBIO />
              <PROENGHIGH />
            </div>
          </div>
        {/if}

        {#if tabSet === 3 || tabSet === 0}
          <div class="flex flex-col gap-4">
            <h3 class="font-bold text-4xl">สอบเข้ามหาวิทยาลัย</h3>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PROTGAT />
              <PROTCAS />
            </div>
          </div>
        {/if}
      </div>
    </svelte:fragment>
  </TabGroup>
</div>
