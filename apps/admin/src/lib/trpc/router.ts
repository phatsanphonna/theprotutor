import { studentRoute } from "./routes/student";
import { t } from "./t";

export const router = t.router({
  student: studentRoute,
});

export type Router = typeof router;
