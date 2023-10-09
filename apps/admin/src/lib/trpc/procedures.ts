import { trpcAdminMiddleware, trpcAuthMiddleware, trpcTeacherMiddleware } from './middleware';
import { t } from './t';

export const authProcedure = t.procedure.use(trpcAuthMiddleware);
export const teacherProcedure = authProcedure.use(trpcTeacherMiddleware);
export const adminProcedure = authProcedure.use(trpcAdminMiddleware);
