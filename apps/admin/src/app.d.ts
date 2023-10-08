// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient, Student, User } from "database";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: PrismaClient;
      user: User | null;
      student: Student | null;
    }
  }
  interface PageData {
    user: User | null;
    student: Student | null;
  }
  // interface Platform {}
}

export {};
