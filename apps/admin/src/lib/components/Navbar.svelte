<script lang="ts">
	import { AppBar } from "@skeletonlabs/skeleton";

</script>

<AppBar padding="p-4 md:px-8" shadow="drop-shadow" background="bg-white">
  <svelte:fragment slot="lead">
    <div class="flex gap-8 items-center">
      <a href="/">
        <div class="flex gap-3 justify-center items-center select-none">
          <img
            src="/logo.png"
            alt="THE PRO TUTOR"
            width={40}
            height={40}
            loading="eager"
          />
          <h1 class="md:text-2xl font-bold">ระบบจัดการหลังบ้าน THE PRO TUTOR</h1>
        </div>
      </a>
    </div>
  </svelte:fragment>
</AppBar>
