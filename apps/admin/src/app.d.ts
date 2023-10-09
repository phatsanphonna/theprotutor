// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient, Student, Teacher } from 'database';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: PrismaClient;
			user: User | null;
			teacher: Teacher | null;
		}
	}
	interface PageData {
		user: User | null;
		teacher: Teacher | null;
	}
	// interface Platform {}
}

export {};
