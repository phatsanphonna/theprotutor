<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import { getScoreRange } from "$lib/utils";
  import {
    Table,
    tableSourceValues,
    type TableSource,
  } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  export let data: PageData;

  const table: TableSource = {
    head: ["วันที่", "ชื่อ", "ค่าเฉลี่ย", "ช่วงคะแนนของคุณ"],
    meta: tableSourceValues(data.ids),
    body: tableSourceValues(data.scores),
  };

  const handleSelect = async (row: CustomEvent<string[]>) => {
    goto(`/scores/${row.detail[0]}`);
  };
</script>

<svelte:head>
  <title>คะแนนสอบ | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <Header>คะแนนสอบ</Header>
  <Table source={table} interactive={true} on:selected={handleSelect} />
</div>
