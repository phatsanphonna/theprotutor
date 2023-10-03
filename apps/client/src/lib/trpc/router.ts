import { meRoutes } from './routes/me';
import { t } from './t';

export const router = t.router({
  me: meRoutes,
});

export type Router = typeof router;