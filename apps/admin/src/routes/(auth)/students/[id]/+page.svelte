<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let firstname = data.student?.firstname;
	let lastname = data.student?.lastname;
	let nickname = data.student?.nickname;
	let telephoneNumber = data.student?.telephoneNumber;
	let guardianTelephoneNumber = data.student?.guardianTelephoneNumber;
</script>

<svelte:head>
	<title
		>ข้อมูลนักเรียนของ {data.student?.firstname}
		{data.student?.lastname} | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
	>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">
	ข้อมูลนักเรียนของ {data.student?.firstname}
	{data.student?.lastname}
</h2>

<form class="grid grid-cols-1 gap-2">
	<label class="label">
		<span>รหัสนักเรียน</span>
		<input
			class="input px-4 py-2"
			type="text"
			placeholder="65001"
			value={data.student?.studentId}
			readonly
		/>
	</label>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
		<label class="label">
			<span>ชื่อจริง</span>
			<input class="input px-4 py-2" type="text" placeholder="ชื่อจริง" bind:value={firstname} />
		</label>

		<label class="label">
			<span>นามสกุล</span>
			<input class="input px-4 py-2" type="text" placeholder="นามสกุล" bind:value={lastname} />
		</label>

		<label class="label">
			<span>ชื่อเล่น</span>
			<input class="input px-4 py-2" type="text" placeholder="ชื่อเล่น" bind:value={nickname} />
		</label>
	</div>

	<label class="label">
		<span>อีเมล</span>
		<input
			class="input px-4 py-2"
			type="email"
			placeholder="elonmusk@spacex.com"
			readonly
			value={data.student?.user.email}
		/>
	</label>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
		<label class="label">
			<span>เบอร์โทรศัพท์</span>
			<input
				class="input px-4 py-2"
				type="tel"
				placeholder="เบอร์โทรศัพท์"
				bind:value={telephoneNumber}
			/>
		</label>

		<label class="label">
			<span>เบอร์โทรศัพท์ผู้ปกครอง</span>
			<input
				class="input px-4 py-2"
				type="tel"
				placeholder="เบอร์โทรศัพท์ผู้ปกครอง"
				bind:value={guardianTelephoneNumber}
			/>
		</label>
	</div>

	<Button class="variant-filled">แก้ไขข้อมูล</Button>
</form>

<hr class="!border-t-2 my-4" />

<div>
	<h3 class="font-bold text-2xl md:text-4xl mb-4">
		งานที่ได้รับมอบหมาย
	</h3>
</div>
