import type { Handle } from "@sveltejs/kit";
import { prisma } from "database";

export const initPrisma: Handle = async ({ event, resolve }) => {
  event.locals.db = prisma;
  return await resolve(event);
};
