<script lang="ts">
  let className = "";
  export let src: string;
  export let title: string;
  export { className as class };
</script>

<iframe
  class={className}
  src={`https://stream-player.byteark.com/players/6579df2a69291334bbd0abf0/videos/${src}`}
  {title}
  frameborder="0"
  allowfullscreen
  referrerpolicy="origin"
></iframe>
