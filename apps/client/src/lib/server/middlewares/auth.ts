import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from '$env/static/private'
import Google from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { SvelteKitAuth } from "@auth/sveltekit"
import { prisma } from 'database'

export const authHandle = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  secret: JWT_SECRET,
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 60,
  },
})