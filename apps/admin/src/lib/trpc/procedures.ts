import { trpcAuthMiddleware } from "./middleware";
import { t } from "./t";

export const authProcedure = t.procedure.use(trpcAuthMiddleware);
