import { fileRoutes } from './routes/file';
import { globalRoutes } from './routes/global';
import { studentRoutes } from './routes/student';
import { t } from './t';

export const router = t.router({
	student: studentRoutes,
	global: globalRoutes,
	file: fileRoutes
});

export type Router = typeof router;
