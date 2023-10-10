import { assignmentRoutes } from './routes/assignment';
import { fileRoutes } from './routes/file';
import { globalRoutes } from './routes/global';
import { lessonRoutes } from './routes/lesson';
import { scoreRoutes } from './routes/score';
import { studentRoutes } from './routes/student';
import { userRoutes } from './routes/user';
import { t } from './t';

export const router = t.router({
	student: studentRoutes,
	global: globalRoutes,
	file: fileRoutes,
	user: userRoutes,
	lesson: lessonRoutes,
	assignment: assignmentRoutes,
	score: scoreRoutes
});

export type Router = typeof router;
