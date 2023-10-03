<script lang="ts">
  import type { User } from "$lib/types";
  import { Avatar } from "@skeletonlabs/skeleton";

  export let user: User | undefined;
</script>

<div class="card variant-filled-primary p-4">
  <section class="flex justify-between items-center">
    <div class="flex gap-4 items-center">
      <Avatar
        src={user?.userAuth.profilePicture}
        width="w-20"
        rounded="rounded-full"
      />

      <div>
        <h4 class="text-2xl md:text-4xl font-bold">{user?.studentId}</h4>
        <p class="md:text-2xl">{user?.firstname} {user?.lastname}</p>
      </div>
    </div>

    <!-- <button class="transition-all hidden md:block variant-filled-surface bg-white rounded hover:scale-105">
      <IconQrcode size={80} />
    </button> -->
  </section>
</div>
