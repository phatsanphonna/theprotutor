import { greetingRoute } from './routes/greeting';
import { t } from './t';

export const router = t.router({
  greeting: greetingRoute
});

export type Router = typeof router;