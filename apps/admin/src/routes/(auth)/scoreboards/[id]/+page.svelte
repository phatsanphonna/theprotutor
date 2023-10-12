<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	$: busy = false;

	const toastStore = getToastStore();

	export let data: PageData;
	let name = data.scoreboard.name || '';
	let total = data.scoreboard.total || 0;
	$: scores = data.scoreboard.scores || [];

	let newStudentId = '';
	let newStudentScore = 0;

	const deleteScoreboard = async () => {
		busy = true;

		try {
			const { success } = await trpc($page).score.deleteScoreboard.mutate(data.scoreboard.id);

			if (success) {
				toastStore.trigger({
					message: 'ลบการประกาศคะแนนสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});

				goto('/scores');
			}
		} catch (err) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการลบข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-ghost-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};

	const editScoreboard = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).score.editScoreboard.mutate({
				id: data.scoreboard.id,
				name,
				total: Number(total)
			});

			if (success) {
				data.scoreboard = { ...payload, scores };

				toastStore.trigger({
					message: 'อัพเดทข้อมูลสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});
			}
		} catch (err) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-ghost-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};

	const addStudent = async () => {
		busy = true;

		if (scores.find((value) => value.student.studentId === newStudentId)) {
			busy = false;

			return toastStore.trigger({
				message: 'นักเรียนคนนี้ถูกเพิ่มเข้าระบบแล้ว',
				background: 'variant-filled-error',
				autohide: true,
				timeout: 3000
			});
		}

		try {
			const { payload } = await trpc($page).student.getStudentByStudentId.query(newStudentId);

			if (payload) {
				scores = [
					...scores,
					{
						student: payload,
						score: newStudentScore,
						studentId: payload.id,
						scoreboardId: data.scoreboard.id
					}
				];

				const { payload: updatedPayload } = await trpc($page).score.updateStudentScore.mutate({
					id: data.scoreboard.id,
					scores: scores.map(({ studentId, score }) => ({
						studentId: studentId,
						score: score
					}))
				});

				data.scoreboard = { ...updatedPayload };

				toastStore.trigger({
					message: 'เพิ่มนักเรียนสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});

				newStudentId = '';
				newStudentScore = 0;
			}
		} catch (err: any) {
			if (err.data.code === 'NOT_FOUND') {
				toastStore.trigger({
					message: 'ไม่พบนักเรียนดังกล่าว',
					background: 'variant-ghost-error',
					autohide: true,
					timeout: 3000
				});
			} else {
				toastStore.trigger({
					message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
					background: 'variant-ghost-error',
					autohide: true,
					timeout: 3000
				});
			}
		}

		busy = false;
	};

	const deleteStudent = async (studentId: string) => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).score.deleteStudentScore.mutate({
				studentId,
				id: data.scoreboard.id
			});

			if (success) {
				data.scoreboard = { ...payload };

				toastStore.trigger({
					message: 'อัพเดทข้อมูลสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});
			}
		} catch (err) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-ghost-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};

	const updateInlineScore = (studentId: string, score: number) => {
		scores = scores.map((value) => {
			if (value.studentId === studentId) {
				if (score > data.scoreboard.total) {
					score = data.scoreboard.total;
				} else if (score < 0) {
					score = 0;
				}

				return {
					...value,
					score
				};
			}

			return value;
		});
	};

	const updateScore = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).score.updateStudentScore.mutate({
				id: data.scoreboard.id,
				scores: scores.map((score) => ({
					studentId: score.studentId,
					score: score.score
				}))
			});

			data.scoreboard = { ...payload, scores };

			if (success) {
				toastStore.trigger({
					message: 'อัพเดทคะแนนของนักเรียนสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});
			}
		} catch (err) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-ghost-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};
</script>

<svelte:head>
	<title
		>ข้อมูลการประกาศคะแนนของ {data.scoreboard.name} | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO
		TUTOR</title
	>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">
	ข้อมูลการประกาศคะแนนของ {data.scoreboard.name}
</h2>

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={editScoreboard}>
	<label class="label">
		<span>ชื่อแบบทดสอบ<span class="text-red-500">*</span></span>
		<input class="input px-4 py-2" type="text" bind:value={name} required />
	</label>

	<div class="grid grid-cols-1 lg:grid-cols-5 gap-2">
		<label class="label">
			<span>คะแนนเต็ม<span class="text-red-500">*</span></span>
			<input
				class="input px-4 py-2"
				type="number"
				inputmode="numeric"
				bind:value={total}
				required
			/>
		</label>

		<label class="label">
			<span>คะแนนเฉลี่ย</span>
			<input class="input px-4 py-2" type="text" bind:value={data.scoreboard.mean} readonly />
		</label>

		<label class="label">
			<span>ส่วนเบี่ยงเบนมาตรฐาน</span>
			<input class="input px-4 py-2" type="text" bind:value={data.scoreboard.sd} readonly />
		</label>

		<label class="label">
			<span>คะแนนต่ำสุด</span>
			<input
				class="input px-4 py-2 variant-ghost-error"
				type="text"
				bind:value={data.scoreboard.min}
				readonly
			/>
		</label>

		<label class="label">
			<span>คะแนนสูงสุด</span>
			<input
				class="input px-4 py-2 variant-ghost-success"
				type="text"
				bind:value={data.scoreboard.max}
				readonly
			/>
		</label>
	</div>

	<div class="flex flex-col md:flex-row justify-end gap-2">
		<Button isLoading={busy} class="variant-soft-error" on:click={deleteScoreboard}
			>ลบการประกาศคะแนน</Button
		>
		<Button type="submit" isLoading={busy} class="variant-filled">แก้ไขข้อมูล</Button>
	</div>
</form>

<hr class="!border-t-2 my-4" />

<div class="mb-4">
	<h3 class="font-bold text-2xl md:text-4xl">คะแนนนักเรียน</h3>
	<p class="text-gray-500">
		ค่าเฉลี่ย คะแนนสูงสุด คะแนนต่ำสุด และ ส่วนเบี่ยงเบนมาตรฐาน ระบบจะคำนวณให้อัตโนมัติ
	</p>
</div>

<div class="table-container mb-4">
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ลำดับ</th>
				<th>รหัสนักเรียน</th>
				<th>ชื่อ-นามสกุล</th>
				<th>คะแนนที่ได้</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each scores as score, i}
				<tr>
					<td>{i + 1}</td>
					<td>{score.student.studentId}</td>
					<td>{score.student.firstname} {score.student.lastname} ({score.student.nickname})</td>
					<td>{score.score}</td>
					<td>
						<button
							type="button"
							class="anchor text-error-500"
							on:click={() => deleteStudent(score.student.id)}>ลบ</button
						>
					</td>
				</tr>
			{/each}
			<tr>
				<th colspan="1">เพิ่มนักเรียน</th>
				<td
					><input
						class="input p-1"
						placeholder="รหัสนักเรียน"
						type="text"
						inputmode="numeric"
						required
						bind:value={newStudentId}
					/></td
				>
				<td></td>
				<td
					><input
						class="input p-1"
						placeholder="คะแนนที่ได้"
						type="number"
						inputmode="numeric"
						bind:value={newStudentScore}
						required
					/></td
				>
				<td
					><button type="button" class="anchor text-success-500" on:click={addStudent}>เพิ่ม</button
					></td
				>
			</tr>
		</tbody>
	</table>
</div>

<div class="flex justify-end gap-2">
	<Button class="variant-filled-primary" isLoading={busy} on:click={updateScore}>อัพเดทคะแนน</Button
	>
</div>
