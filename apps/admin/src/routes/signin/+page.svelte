<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';

	const handleSignIn = async () => {
		await signIn('google');
	};
</script>

<button class="btn variant-filled-primary" on:click={handleSignIn}>
	เข้าสู่ระบบด้วยบัญชี Google
</button>
