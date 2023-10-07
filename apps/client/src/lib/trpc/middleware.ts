import { TRPCError } from "@trpc/server";
import { t } from "./t";

export const trpcAuthMiddleware = t.middleware(({ next, ctx }) => {
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({ ctx });
});
