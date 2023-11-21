<script lang="ts">
  export let title: string;
  export let description: string;
  export let price: number;
</script>

<div class="card variant-ghost">
  <header class="card-header text-2xl font-medium">
    {title}
  </header>

  <section class="px-4 text-gray-500">
    {description}
  </section>

  <!-- Make footer stick to bottom of div -->
  <footer
    class="card-footer flex justify-between items-center relative bottom-0 mt-4"
  >
    <span class="text-2xl font-bold">เริ่มต้น {price.toLocaleString()} บาท/เดือน</span>
  </footer>
</div>
