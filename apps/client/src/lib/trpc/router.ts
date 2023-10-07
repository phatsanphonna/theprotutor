import { appointmentRoutes } from './routes/appointment';
import { meRoutes } from './routes/me';
import { scoreRoutes } from './routes/score';
import { t } from './t';

export const router = t.router({
  me: meRoutes,
  appointment: appointmentRoutes,
  score: scoreRoutes
});

export type Router = typeof router;