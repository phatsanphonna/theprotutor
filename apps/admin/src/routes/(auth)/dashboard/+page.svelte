<script>
	import { page } from '$app/stores';
</script>

<div class="card">
	<header class="card-header font-bold text-2xl">
		สวัสดี, คุณ {$page.data.user.name}
	</header>
</div>
