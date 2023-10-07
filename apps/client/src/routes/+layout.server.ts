import { prisma } from 'database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, getClientAddress }) => {
  const session = await locals.getSession()
  const { user, student } = locals;

  if (session && user) {
    const exist = await prisma.log.findFirst({
      where: {
        userId: user.id,
        address: {
          not: null,
        }
      }
    })

    if (!exist) {
      const clientAddress = getClientAddress();

      await prisma.log.update({
        where: {
          userId: user.id,
          address: null,
        },
        data: {
          address: clientAddress,
        }
      })
    }
  }

  return { session, user, student }
}