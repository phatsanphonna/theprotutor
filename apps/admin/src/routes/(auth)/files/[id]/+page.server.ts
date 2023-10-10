import { NODE_ENV } from '$env/static/private';
import { trpc } from '$lib/trpc/client';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

const getClientHost = (host: string) => {
  if (NODE_ENV === 'development') {
    return `http://${host.replace('7810', '7811')}`;
  } else {
    return `http://${host.replace('admin.', '')}`;
  }
}


export const load: PageServerLoad = async (event) => {
  const { params, url } = event;
  const { payload } = await router.createCaller(await createContext(event)).file.getFileById(params.id);

  const redirected = url.searchParams.get('redirected');

  return {
    files: {
      ...payload,
      location: `${getClientHost(url.host)}/files/${payload?.id}`,
    },
    redirected: redirected == '1',
  }
};