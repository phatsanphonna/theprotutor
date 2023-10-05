<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import type { Student, User } from "database";

  export let student: Student | null;
  export let user: User | null;
</script>

<div class="card variant-filled-primary p-4">
  <section class="flex justify-between items-center">
    <div class="flex gap-4 items-center">
      <Avatar
        src={String(user?.image)}
        width="w-20"
        rounded="rounded-full"
      />

      <div>
        <h4 class="text-2xl md:text-4xl font-bold">{student?.studentId}</h4>
        <p class="md:text-2xl">{student?.firstname} {student?.lastname}</p>
      </div>
    </div>

    <!-- <button class="transition-all hidden md:block variant-filled-surface bg-white rounded hover:scale-105">
      <IconQrcode size={80} />
    </button> -->
  </section>
</div>
