// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient, User } from 'database';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: PrismaClient,
			user: User | null,
		}
	}
	// interface PageData {}
	// interface Platform {}
}


export { };
