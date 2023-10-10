<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import {
		IconAlarm,
		IconArchive,
		IconCalendar,
		IconDashboard,
		IconDoorExit,
		IconFiles,
		IconGridPattern,
		IconLayoutDashboard,
		IconMenu2,
		IconNotebook,
		IconSchool,
		IconTestPipe,
		IconTestPipe2,
		IconUser,
		IconUsers
	} from '@tabler/icons-svelte';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/stores/is-authenticated';

	const routes = [
		{
			href: '/dashboard',
			Icon: IconLayoutDashboard,
			label: 'แดชบอร์ด'
		},
		{
			href: '/students',
			Icon: IconUser,
			label: 'นักเรียน'
		},
		{
			href: '/assignments',
			Icon: IconNotebook,
			label: 'งานมอบหมาย'
		},
		{
			href: '/lessons',
			Icon: IconArchive,
			label: 'บทเรียน'
		},
		{
			href: '/files',
			Icon: IconFiles,
			label: 'ไฟล์'
		},
		{
			href: '/scores',
			Icon: IconTestPipe,
			label: 'คะแนน'
		},
		{
			href: '/appointments',
			Icon: IconCalendar,
			label: 'นัดเรียนชดเชย'
		}
	];

	const adminRoutes = [
		{
			href: '/teachers',
			Icon: IconSchool,
			label: 'ผู้สอน'
		},
		{
			href: '/users',
			Icon: IconUsers,
			label: 'ผู้ใช้งาน'
		}
	];

	let currentTile = 0;

	const handleSignOut = async () => {
		await signOut();
		isAuthenticated.set(false);
		goto('/');
	};
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

	{#if $page.data.user?.roles?.includes('ADMIN')}
		{#each adminRoutes as { href, Icon, label }}
			<AppRailAnchor {href} selected={$page.url.pathname.startsWith(href)}>
				<svelte:fragment slot="lead">
					<Icon />
				</svelte:fragment>
				<span>{label}</span>
			</AppRailAnchor>
		{/each}
	{/if}

	<svelte:fragment slot="trail">
		<AppRailTile
			bind:group={currentTile}
			name="signout"
			value={0}
			title="signout"
			active="variant-soft-error"
			hover="variant-filled-error"
			on:click={handleSignOut}
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
