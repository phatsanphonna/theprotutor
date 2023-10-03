import type { Handle } from '@sveltejs/kit'
import { PrismaClient } from 'database'

export const initPrisma: Handle = async ({ event, resolve }) => {
  event.locals.db = new PrismaClient()
  return await resolve(event)
}