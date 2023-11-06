<script lang="ts">
  let className = "";
  export let src: string;
  export let title: string;
  export { className as class };
</script>

<iframe
  class={className}
  src={`https://stream-player.byteark.com/players/65467fc8cc35c2062ae96ee5/videos/${src}`}
  {title}
  frameborder="0"
  allowfullscreen
  referrerpolicy="origin"
></iframe>
