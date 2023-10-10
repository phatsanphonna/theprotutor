import { fileRoutes } from './routes/file';
import { globalRoutes } from './routes/global';
import { studentRoutes } from './routes/student';
import { userRoutes } from './routes/user';
import { t } from './t';

export const router = t.router({
	student: studentRoutes,
	global: globalRoutes,
	file: fileRoutes,
	user: userRoutes,
});

export type Router = typeof router;
