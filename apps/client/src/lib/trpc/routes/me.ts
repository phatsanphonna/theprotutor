import { authProcedure } from '../procedures';
import { t } from '../t';

export const meRoutes = t.router({
  getAssignments: authProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;

    const assignments = await db.assignment.findMany({
      where: {
        assignTo: {
          every: {
            id: user?.id
          }
        }
      },
      include: {
        lesson: {
          include: {
            materials: {
              select: {
                _count: true,
              }
            }
          }
        }
      },
    });

    return { success: true, payload: assignments }
  })
})
