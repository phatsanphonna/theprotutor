import { appointmentRoutes } from './routes/appointment';
import { meRoutes } from './routes/me';
import { t } from './t';

export const router = t.router({
  me: meRoutes,
  appointment: appointmentRoutes
});

export type Router = typeof router;