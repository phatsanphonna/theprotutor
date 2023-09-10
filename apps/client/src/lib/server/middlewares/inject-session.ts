import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { User } from '$lib/types/User';
import type { Handle } from '@sveltejs/kit';

export const injectSession: Handle = async ({ event, resolve }) => {
  const { cookies, fetch } = event;
  const accessToken = cookies.get('accessToken')

  if (accessToken) {
    const response = await fetch(PUBLIC_BACKEND_URL + '/student', {
      method: 'GET',
      credentials: 'include',
    })
    const user = await response.json() satisfies User
    event.locals.user = user
  }

  const response = await resolve(event)
  return response
}
