<script lang="ts">
  import AuthButton from "./AuthButton.svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  const disableDrawer = () => {
    drawerStore.close();
  };
</script>

<div class="flex flex-col gap-8 w-full h-full p-8">
  <ul class="flex flex-col gap-2">
    <li class="hover:underline">
      <a href="/courses" on:click={disableDrawer}>คอร์สเรียน</a>
    </li>
    <li class="hover:underline">
      <a href="/tutors" on:click={disableDrawer}>ติวเตอร์</a>
    </li>
  </ul>

  <hr class="!border-t-2" />

  <div>
    <AuthButton />
  </div>
</div>
