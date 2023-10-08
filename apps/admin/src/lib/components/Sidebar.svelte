<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import {
		IconArchive,
		IconDoorExit,
		IconFile,
		IconNotebook,
		IconUser
	} from '@tabler/icons-svelte';
	import { page } from '$app/stores';

	const routes = [
		{
			href: '/students',
			Icon: IconUser,
			label: 'นักเรียน'
		},
		{
			href: '/assignments',
			Icon: IconNotebook,
			label: 'งานที่มอบหมาย'
		},
		{
			href: '/lessons',
			Icon: IconArchive,
			label: 'บทเรียน'
		},
		{
			href: '/files',
			Icon: IconFile,
			label: 'ไฟล์'
		}
	];

	let currentTile = 0;
</script>

<AppRail width="w-24" background="variant-soft-surface">
	{#each routes as { href, Icon, label }}
		<AppRailAnchor {href} selected={$page.url.pathname.startsWith(href)}>
			<svelte:fragment slot="lead">
				<Icon />
			</svelte:fragment>
			<span>{label}</span>
		</AppRailAnchor>
	{/each}

	<svelte:fragment slot="trail">
		<AppRailTile
			bind:group={currentTile}
			name="signout"
			value={0}
			title="signout"
			active="variant-soft-error"
			hover="variant-filled-error"
		>
			<svelte:fragment slot="lead">
				<div class="grid place-items-center">
					<IconDoorExit />
				</div>
			</svelte:fragment>

			<span>ออกจากระบบ</span>
		</AppRailTile>
	</svelte:fragment>
</AppRail>
