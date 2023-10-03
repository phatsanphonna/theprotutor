// See https://kit.svelte.dev/docs/types#app

import type { User } from '$lib/types';
import type { PrismaClient } from 'database';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User,
			db: PrismaClient,
		}
	}
	// interface PageData {}
	// interface Platform {}
}


export { };
