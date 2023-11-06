import { authProcedure } from '../procedures';
import { t } from '../t';

export const passcodeRoutes = t.router({
  getPasscode: authProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;

    const passcode = await db.passcode.findUnique({
      where: {
        ownerId: user!.id,
        isUsed: false
      }
    });


    if (!passcode) {
      const generatedPasscode = Math.round(Math.random() * 10000).toString().padStart(4, '0');

      const result = await db.passcode.create({
        data: {
          ownerId: user!.id,
          passcode: generatedPasscode
        }
      });

      return { success: true, payload: result };
    }

    return { success: true, payload: passcode };
  })
})