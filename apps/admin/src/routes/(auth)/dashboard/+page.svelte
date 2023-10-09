<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card variant-ghost-success mb-4">
	<header class="card-header font-bold text-4xl">
		สวัสดี, คุณ {$page.data.user.name}
	</header>

	<section class="p-4 flex flex-col">
		<p class="text-lg font-medium">ยินดีต้อนรับเข้าสู่ระบบจัดการหลังบ้าน THE PRO TUTOR</p>
		<span>คุณสามารถเลือกใช้งานได้จากเมนูด้านซ้ายมือ</span>
	</section>
</div>

<div class="grid grid-cols-2">
	<div class="card variant-ghost">
		<header class="card-header font-bold text-2xl">จำนวนผู้ใช้งานในขณะนี้</header>

		<section class="flex flex-col p-4">
			<p class="text-lg">
				{data.online} คน
			</p>
		</section>
	</div>
</div>
