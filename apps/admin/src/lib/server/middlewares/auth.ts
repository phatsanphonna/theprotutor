import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from '$env/static/private';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { Role, prisma } from 'database';

export const authMiddleware = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	secret: JWT_SECRET,
	providers: [
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		signIn: async ({ user }) => {
			if (user.email) {
				const exist = await prisma.user.findUnique({
					where: { email: user.email }
				});

				const checkRole = exist?.roles.includes(Role.ADMIN) || exist?.roles.includes(Role.TEACHER);

				return !!exist && !!checkRole;
			}

			return false;
		}
	},
	session: {
		maxAge: 24 * 60 * 60 // Set session expire in 8 hours,
	},
	pages: {
		error: '/unauthorized'
	}
});
