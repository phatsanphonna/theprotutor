<script lang="ts">
  export let title: string;
  export let description: string = "";
</script>

<div class="card">
  <header class="card-header">
    <h4 class="text-2xl font-bold">{title}</h4>
    <p class="font-light">{description}</p>
  </header>

  <section class="p-4 flex flex-col gap-2">
    <div>
      <h6 class="text-xl font-medium">ระดับชั้น</h6>
      <slot name="grade" />
    </div>
    <div>
      <h6 class="text-xl font-medium">วิชา</h6>
      <slot name="subject" />
    </div>
    <div>
      <h6 class="text-xl font-medium">เวลาเรียน</h6>
      <slot name="schedule" />
    </div>

    <div>
      <h6 class="text-xl font-medium">ราคา</h6>
      <slot name="price" />
    </div>
  </section>

  <footer class="card-footer flex flex-col">
    <slot name="remarks" />
  </footer>
</div>
