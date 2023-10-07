<script lang="ts">
  export let name: string;
  export let score: number;
  export let variant: string = "variant-ghost-surface";
</script>

<div class={"card pb-4 " + variant}>
  <header class="card-header">
    <h4 class="text-xl md:text-2xl text-center">{name}</h4>
  </header>

  <section class="grid place-items-center">
    <p class="text-6xl font-bold">
      {score}
    </p>
  </section>
</div>
