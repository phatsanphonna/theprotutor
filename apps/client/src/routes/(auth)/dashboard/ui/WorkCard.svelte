<script lang="ts">
  export let name: string;
  export let expireDate: string | null;
  export let totalFiles: number = 0;
  export let id: string;

  const parsedExpireDate = new Date(expireDate!);

  const isExpired =
    expireDate && parsedExpireDate.getTime() <= new Date().getTime();
  const formatExpireDate =
    expireDate &&
    new Intl.DateTimeFormat("th-TH", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(parsedExpireDate);
</script>

{#if isExpired}
  <div class="card variant-filled-surface">
    <header class="card-header">
      <h4 class="font-medium text-2xl">{name}</h4>
    </header>

    <footer class="card-footer">
      <span class="badge variant-ghost">{totalFiles} ไฟล์</span>
      <span class="badge variant-filled-error text-white">หมดอายุแล้ว</span>
    </footer>
  </div>
{:else}
  <a href={`/assignments/${id}`}>
    <div class="card variant-outline-surface card-hover transition-all">
      <header class="card-header">
        <h4 class="font-medium text-lg md:text-2xl">{name}</h4>
      </header>

      <footer class="card-footer">
        <span class="badge variant-ghost">{totalFiles} ไฟล์</span>
        {#if !expireDate && !isExpired}
          <span class="badge variant-filled-success text-white">
            ไม่มีวันหมดอายุ
          </span>
        {:else}
          <span class="badge variant-filled-warning text-white">
            ทำได้ถึง {formatExpireDate}
          </span>
        {/if}
      </footer>
    </div>
  </a>
{/if}
